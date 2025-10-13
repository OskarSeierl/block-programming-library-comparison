import React, {useEffect, useRef} from "react";

declare global {
    interface Window {
        Blockly?: any;
    }
}

const ScratchBlocksEditor = () => {
    const blocklyDiv = useRef(null);
    const workspaceRef = useRef(null);

    useEffect(() => {
        if (workspaceRef.current) return; // already initialized

        const Blockly = window.Blockly;
        if (!Blockly) {
            console.error("Blockly not loaded");
            return;
        }

        workspaceRef.current = Blockly.inject(blocklyDiv.current, {
            toolbox: `<xml style="display: none">
              <category name="Motion" colour="#4C97FF" secondaryColour="#4280D7">
                <block type="motion_movesteps"></block>
                <block type="math_number"></block>
              </category>
            </xml>`,
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true, // enables zooming with wheel
            },
            media: "/libs/scratch-blocks/media/",
        });
    }, []);

    return (
        <div
            ref={blocklyDiv}
            style={{ flex: 1, height: "98vh", width: "100%", border: "1px solid #ccc" }}
        />
    );
};

export default ScratchBlocksEditor;
