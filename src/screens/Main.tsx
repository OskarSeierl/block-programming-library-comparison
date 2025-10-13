import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import BlocklyEditor from "../components/BocklyEditor/BlocklyEditor";

const Main = () => {
    return (
        <div className="main-grid">
            <ScratchBlocksEditor />
            <BlocklyEditor />
        </div>
    );
};

export default Main;
