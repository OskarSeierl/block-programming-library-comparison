import Robot from "./Robot";
import ScratchBlocks from "scratch-blocks";

type BlockDefinitions<R = void> = {
    [key: string]: (block: ScratchBlocks.Block, robot: Robot) => R
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const definitions: BlockDefinitions = {
    "motion_movesteps": async (block, robot) => {
        robot.print(`Moving steps`);
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
    }
};

const executeBlock = async (block: ScratchBlocks.Block, robot: Robot) => {
    if(definitions[block.type]) {
        await definitions[block.type](block, robot);
    } else {
        console.warn(`No definition for block type: ${block.type}`);
    }
}

const traverseAndExecuteBlock = async (block: ScratchBlocks.Block, robot: Robot) => {
    block.workspace.glowBlock(block.id, true);
    await executeBlock(block, robot);
    await sleep(500); // glow duration
    block.workspace.glowBlock(block.id, false);

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
