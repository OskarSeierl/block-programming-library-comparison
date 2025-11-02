import Robot from "./Robot";
import ScratchBlocks from "scratch-blocks";
import {ExecutionError} from "./ExecutionError";
import {FieldType} from "./components/ScratchBlocksEditor/ScratchBlocksEditor";

type BlockDefinitions<R = void> = {
    [key: string]: (block: ScratchBlocks.Block, robot: Robot) => R
};

const GLOW_DURATION_MS = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const definitions: BlockDefinitions = {
    "motion_movesteps": async (block, robot) => {
        const stepsBlock = block.getInputTargetBlock("STEPS");
        if(!stepsBlock) {
            throw new ExecutionError("Missing 'steps' input for 'move steps' block", block);
        }
        const steps = parseInt(stepsBlock.getFieldValue("NUM"), 10) || 0;
        robot.go(steps);
        robot.print(`Moving ${steps} steps`);
    },
    // sending
    "sensing_touchingobject": async (block, robot) => {
        const objectBlock = block.getInputTargetBlock("TOUCHINGOBJECTMENU");
        if (!objectBlock) {
            throw new ExecutionError("Missing object input for 'touching object' block", block);
        }

        const objectName = objectBlock.getFieldValue("CUSTOMMENU");

        if (objectName === FieldType.WALL) {
            return robot.wallInFront();
        }

        return false;
    },
    // control structures
    "control_repeat": async (block, robot) => {
        const timesBlock = block.getInputTargetBlock("TIMES");
        if(!timesBlock) {
            throw new ExecutionError("Missing 'times' input for 'repeat' block", block);
        }
        const fieldVal = timesBlock.getFieldValue("NUM");
        const times = parseInt(fieldVal, 10) || 0;
        const substack = block.getInputTargetBlock("SUBSTACK");
        for (let i = 0; i < times; i++) {
            if (substack) await traverseAndExecuteBlock(substack, robot);
        }
    },
    "control_repeat_until": async (block, robot) => {
        const conditionBlock = block.getInputTargetBlock("CONDITION");
        if(!conditionBlock) {
            throw new ExecutionError("Missing condition for 'repeat until' block", block);
        }
        const substack = block.getInputTargetBlock("SUBSTACK");
        if(substack) {
            while (true) {
                const conditionValue = Boolean(await executeAndGlow(conditionBlock, robot));
                if (conditionValue) break;
                await traverseAndExecuteBlock(substack, robot);
            }
        }
    },
    "control_forever": async (block, robot) => {
        const substack = block.getInputTargetBlock("SUBSTACK");
        if (substack) {
            while (true) {
                await traverseAndExecuteBlock(substack, robot);
            }
        }
    },
    "control_if": async (block, robot) => {
        const conditionBlock = block.getInputTargetBlock("CONDITION");
        if(!conditionBlock) {
            throw new ExecutionError("Missing condition for 'if' block", block);
        }
        const conditionValue = Boolean(await executeAndGlow(conditionBlock, robot));
        const substack = block.getInputTargetBlock("SUBSTACK");
        if (conditionValue && substack) await traverseAndExecuteBlock(substack, robot);
    },
    // logical operators
    "operator_not": async (block, robot) => {
        const inputBlock = block.getInputTargetBlock("OPERAND");
        if(!inputBlock) {
            throw new ExecutionError("Missing operand for 'not' operator", block);
        }
        return Boolean(await executeAndGlow(inputBlock, robot));
    },
    "operator_and": async (block, robot) => {
        const leftBlock = block.getInputTargetBlock("OPERAND1");
        const rightBlock = block.getInputTargetBlock("OPERAND2");
        if(!leftBlock || !rightBlock) {
            throw new ExecutionError("Missing operand(s) for 'and' operator", block);
        }
        const leftValue = Boolean(await executeAndGlow(leftBlock, robot));
        const rightValue = Boolean(await executeAndGlow(rightBlock, robot));
        return leftValue && rightValue;
    },
    "operator_or": async (block, robot) => {
        const leftBlock = block.getInputTargetBlock("OPERAND1");
        const rightBlock = block.getInputTargetBlock("OPERAND2");
        if(!leftBlock || !rightBlock) {
            throw new ExecutionError("Missing operand(s) for 'or' operator", block);
        }
        const leftValue = Boolean(await executeAndGlow(leftBlock, robot));
        const rightValue = Boolean(await executeAndGlow(rightBlock, robot));
        return leftValue || rightValue;
    }
};

const executeBlock = async (block: ScratchBlocks.Block, robot: Robot) => {
    if(definitions[block.type]) {
        try {
            return await definitions[block.type](block, robot);
        } catch (error) {
            // TODO: change to real error handling
            alert("Error during execution: " + error);
        }
    } else {
        console.warn(`No definition for block type: ${block.type}`);
    }
}

const executeAndGlow = async (block: ScratchBlocks.Block, robot: Robot) => {
    block.workspace.glowBlock(block.id, true);
    const result = await executeBlock(block, robot);
    await sleep(GLOW_DURATION_MS);
    block.workspace.glowBlock(block.id, false);
    return result;
}

const traverseAndExecuteBlock = async (block: ScratchBlocks.Block, robot: Robot) => {
    await executeAndGlow(block, robot);

    // Move to next block
    const next = block.getNextBlock();
    if (next) await traverseAndExecuteBlock(next, robot);
}

export const executeCode = (workspace: ScratchBlocks.Workspace, robot: Robot) => {
    const blocks = workspace.getTopBlocks(); // blocks without parents

    console.log("Top level blocks count:", blocks.length);

    for(let block of blocks) {
        traverseAndExecuteBlock(block, robot);
    }
};
