import React, {useEffect, useRef} from "react";
import {setWorkspace} from "../../blocklyStore";

interface Props {
    onChange: (event: string, workspace: ScratchBlocks.Workspace) => void;
}

export enum FieldType {
    WALL="wall"
}

const WORKSPACE_DEFINITION = {
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
                <block type="control_repeat_until" id="control_repeat_until"></block>
                <block type="control_if"></block>
                <block type="operator_not"></block>
                <block type="operator_and"></block>
                <block type="operator_or"></block>
                <block type="sensing_touchingobject">
                    <value name="TOUCHINGOBJECTMENU">
                        <shadow type="custom_touchingobjectmenu"></shadow>
                    </value>
                </block>
              </category>
            </xml>`,
    trashcan: true,
    zoom: {
        controls: true,
        wheel: true, // enables zooming with wheel
    },
    media: "/libs/scratch-blocks/media/",
};

const ScratchBlocksEditor = ({onChange}: Props) => {
    const blocklyDiv = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<ScratchBlocks.Workspace | null>(null);

    function switchWorkspaceLanguage() {
        const Blockly = window.Blockly;
        const workspace: ScratchBlocks.Workspace = Blockly.getMainWorkspace();

        // 1. Save current workspace
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xmlDom);

        // 2. Switch language
        Blockly.ScratchMsgs.setLocale(Blockly.ScratchMsgs.currentLocale_ === 'en' ? 'de' : 'en');

        // 3. Dispose old workspace
        workspace.dispose();

        // 4. Create new workspace
        const newWorkspace = Blockly.inject(blocklyDiv.current, WORKSPACE_DEFINITION);

        // 5. Restore blocks
        const xmlDomRestored = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xmlDomRestored, newWorkspace);
    }

    const fixCurrentBlocks = () => {
        const Blockly = window.Blockly;
        const workspace: ScratchBlocks.Workspace = Blockly.getMainWorkspace();
        const allBlocks = workspace.getAllBlocks();
        allBlocks.forEach(block => {
            block.setMovable(false);
            block.setDeletable(false);
            block.setEditable(false);
        });

    }

    useEffect(() => {
        if (workspaceRef.current) return; // already initialized

        const Blockly = window.Blockly;
        if (!Blockly) {
            console.error("Blockly not loaded");
            return;
        }

        Blockly.Blocks['custom_touchingobjectmenu'] = {
            init: function () {
                const field = new Blockly.FieldDropdown([
                    ['Wall', FieldType.WALL]
                ]);
                this.appendDummyInput()
                    .appendField(field, 'CUSTOMMENU');
                this.setOutput(true, 'String');
                this.setColour(230);
            }
        };

        const workspace: ScratchBlocks.Workspace = Blockly.inject(blocklyDiv.current, WORKSPACE_DEFINITION);

        setWorkspace(workspace);
        workspaceRef.current = workspace;

        workspace.addChangeListener((event: any) => {
            onChange(event.type, workspace);
        });
    }, [onChange]);

    return (
        <div>
            <div
                ref={blocklyDiv}
                style={{ flex: 1, height: "90vh", width: "100%", border: "1px solid #ccc" }}
            />
            <button onClick={() => switchWorkspaceLanguage()}>Toggle Language</button>
            <button onClick={fixCurrentBlocks}>Fix current blocks</button>
        </div>
    );
};

export default ScratchBlocksEditor;
