import ScratchBlocks from "scratch-blocks";

export class ExecutionError extends Error {
    blockId: string;
    blockType: string;
    constructor(message: string, block: ScratchBlocks.Block) {
        super(message);
        this.name = "ExecutionError";
        this.blockId = block.id;
        this.blockType = block.type;
    }
}
