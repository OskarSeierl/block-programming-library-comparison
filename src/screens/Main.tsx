import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import ScratchBlocks from "scratch-blocks";

const Main = () => {

    const handleScratchBlocksChange = (event: string, workspace: ScratchBlocks.Workspace) => {
        if(event === "endDrag") {
            //console.log(workspace);
            console.log(workspace.getAllBlocks());
            console.log(workspace.getTopBlocks());
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
