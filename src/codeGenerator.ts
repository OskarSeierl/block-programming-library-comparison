import Robot from "./Robot";
import ScratchBlocks from "scratch-blocks";

type BlockDefinitions<R = void> = {
    [key: string]: (block: ScratchBlocks.Block, robot: Robot) => R
};

const definitions: BlockDefinitions = {
    "motion_movesteps": (block, robot) => {
        console.log(block.getFieldValue("STEPS"));
        console.log(block.getInputTargetBlock('STEPS'))
        robot.print(`Moving steps`);
    },
    "control_repeat": (block, robot) => {
        //const subBlocks = block.getInputTargetBlock("SUBSTACK");
        const timesInput = block.getInput("TIMES");
        for(let i = 0; i < timesInput; i++) {

        }
    }
};

export const executeCode = (workspace: ScratchBlocks.Workspace, robot: Robot) => {
    const blocks = workspace.getTopBlocks();
    console.log("Executing code with blocks:", blocks.length);
    blocks.forEach(block => {
        console.log(`Executing block: ${block.type} (${block.id})`);
        workspace.glowBlock(block.id, true);
        setTimeout(() => {
            if(definitions[block.type]) {
                definitions[block.type](block, robot);
            }
            workspace.glowBlock(block.id, false);
        }, 2000);
    });
};
