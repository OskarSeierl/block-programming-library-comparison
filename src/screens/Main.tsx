import ScratchBlocksEditor from "../components/ScratchBlocksEditor/ScratchBlocksEditor";
import BlocklyEditor from "../components/BocklyEditor/BlocklyEditor";

const Main = () => {
    return (
        <div className="main-grid">
            <ScratchBlocksEditor onChange={() => console.log("hello")} />
            <BlocklyEditor />
        </div>
    );
};

export default Main;
