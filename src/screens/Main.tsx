import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import ScratchBlocks from "scratch-blocks";
import {executeCode} from "../codeGenerator";
import Robot from "../Robot";
import {getWorkspace} from "../blocklyStore";

const Main = () => {

    const handleScratchBlocksChange = (event: string, workspace: ScratchBlocks.Workspace) => {
        if(event === "endDrag") {
            console.log(workspace.getAllBlocks());
            console.log(workspace.getTopBlocks());
            console.log(workspace)
            //const testRobot: Robot = new Robot("TestBot");
            //executeCode(workspace, testRobot);
        }
    };

    const executeBlocks = () => {
        const testRobot: Robot = new Robot("TestBot");
        executeCode(getWorkspace()!, testRobot);
    }

    return (
        <div>
            <div className="main-grid">
                <ScratchBlocksEditor onChange={handleScratchBlocksChange} />
                {/*<BlocklyEditor />*/}
            </div>
            <button onClick={executeBlocks}>Execute</button>
        </div>
    );
};

export default Main;
