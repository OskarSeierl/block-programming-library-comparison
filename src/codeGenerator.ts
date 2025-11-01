import Robot from "./Robot";
import ScratchBlocks from "scratch-blocks";
import {ExecutionError} from "./ExecutionError";

type BlockDefinitions<R = void> = {
    [key: string]: (block: ScratchBlocks.Block, robot: Robot) => R
};

const GLOW_DURATION_MS = 1500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const definitions: BlockDefinitions = {
    "motion_movesteps": async (block, robot) => {
        const stepsBlock = block.getInputTargetBlock("STEPS");
        const steps = stepsBlock ? parseInt(stepsBlock.getFieldValue("NUM"), 10) || 0 : 0;
        robot.print(`Moving ${steps} steps`);
    },
    "control_repeat": async (block, robot) => {
        let times = 0;
        const timesBlock = block.getInputTargetBlock("TIMES");
        if (timesBlock) {
            const fieldVal = timesBlock.getFieldValue("NUM");
            times = parseInt(fieldVal, 10) || 0;
        }
        const substack = block.getInputTargetBlock("SUBSTACK");

        for (let i = 0; i < times; i++) {
            if (substack) await traverseAndExecuteBlock(substack, robot);
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
        return await definitions[block.type](block, robot);
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

    try {
        for(let block of blocks) {
            traverseAndExecuteBlock(block, robot);
        }
    } catch (error) {
        // TODO: change to real error handling
        alert("Error during execution: " + error);
    }
};
