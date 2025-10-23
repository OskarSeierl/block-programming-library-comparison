import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import BlocklyEditor from "../components/BocklyEditor/BlocklyEditor";

const Main = () => {

    const handleScratchBlocksChange = (event: string, workspace: any) => {
        if(event === "endDrag") {
            alert("hi")
        }
    };

    return (
        <div className="main-grid">
            <ScratchBlocksEditor onChange={handleScratchBlocksChange} />
            <BlocklyEditor />
        </div>
    );
};

export default Main;
