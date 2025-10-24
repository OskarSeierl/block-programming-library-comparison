import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import ScratchBlocks from "scratch-blocks";
import {executeCode} from "../codeGenerator";
import Robot from "../Robot";

const Main = () => {

    const handleScratchBlocksChange = (event: string, workspace: ScratchBlocks.Workspace) => {
        if(event === "endDrag") {
            console.log(workspace.getAllBlocks());
            console.log(workspace.getTopBlocks());
            console.log(workspace)
            const testRobot: Robot = new Robot("TestBot");
            executeCode(workspace, testRobot);
        }
    };

    return (
        <div className="main-grid">
            <ScratchBlocksEditor onChange={handleScratchBlocksChange} />
            {/*<BlocklyEditor />*/}
        </div>
    );
};

export default Main;
