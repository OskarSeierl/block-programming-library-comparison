import ScratchBlocks from "scratch-blocks";

let workspace: ScratchBlocks.Workspace | undefined = undefined;

export function setWorkspace(ws: ScratchBlocks.Workspace) {
    workspace = ws;
}

export function getWorkspace(): ScratchBlocks.Workspace | undefined {
    return workspace;
}
