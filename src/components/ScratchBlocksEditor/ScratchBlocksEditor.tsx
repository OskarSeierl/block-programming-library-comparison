import React, {useEffect, useRef} from "react";

interface Props {
    onChange: (event: string, workspace: ScratchBlocks.Workspace) => void;
}

const ScratchBlocksEditor = ({onChange}: Props) => {
    const blocklyDiv = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<ScratchBlocks.Workspace | null>(null);

    useEffect(() => {
        if (workspaceRef.current) return; // already initialized

        const Blockly = window.Blockly;
        if (!Blockly) {
            console.error("Blockly not loaded");
            return;
        }

        const workspace: ScratchBlocks.Workspace = Blockly.inject(blocklyDiv.current, {
            toolbox: `<xml style="display: none">
              <category name="Motion" colour="#4C97FF" secondaryColour="#4280D7">
                <block type="motion_movesteps">
                    <value name="STEPS">
                        <shadow type="math_number">
                            <field name="NUM"></field>
                        </shadow>
                    </value>
                </block>
                <block type="control_repeat">
                    <value name="TIMES">
                        <shadow type="math_number">
                            <field name="NUM">10</field>
                        </shadow>
                    </value>
                    <statement name="SUBSTACK">
                    <!-- nested blocks go here -->
                    </statement>
                </block>
                <block type="control_if">
                
                </block>
                <block type="operator_not"></block>
                <block type="operator_and"></block>
                <block type="operator_or"></block>
              </category>
            </xml>`,
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true, // enables zooming with wheel
            },
            media: "/libs/scratch-blocks/media/",
        });

        workspaceRef.current = workspace;

        workspace.addChangeListener((event: any) => {
            onChange(event.type, workspace);
        });
    }, [onChange]);




    return (
        <div
            ref={blocklyDiv}
            style={{ flex: 1, height: "98vh", width: "100%", border: "1px solid #ccc" }}
        />
    );
};

export default ScratchBlocksEditor;
