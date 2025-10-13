import React, {useState} from "react";
import {BlocklyWorkspace} from "react-blockly";

declare global {
    interface Window {
        Blockly?: any;
    }
}

const BlocklyEditor = () => {
    const [xml, setXml] = useState();

    const MY_TOOLBOX = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Logic",
                colour: "#5C81A6",
                contents: [
                    { kind: "block", type: "controls_if" },
                    { kind: "block", type: "logic_compare" },
                    { kind: "block", type: "logic_operation" },
                    { kind: "block", type: "logic_boolean" },
                ],
            },
            {
                kind: "category",
                name: "Loops",
                colour: "#5BA55B",
                contents: [
                    {kind: "block", type: "controls_repeat_ext"},
                    {kind: "block", type: "controls_whileUntil"},
                ],
            }
        ]
    };

    const workspaceConfiguration = {
        toolbox: MY_TOOLBOX,          // your toolbox JSON
        collapse: true,               // allow collapsing blocks
        comments: true,               // allow block comments
        disable: false,               // allow disabling blocks
        maxBlocks: Infinity,          // no block limit
        trashcan: true,               // show trashcan
        horizontalLayout: false,      // vertical toolbox (set true for horizontal)
        toolboxPosition: 'start',     // 'start' (left/top) or 'end' (right/bottom)
        css: true,                    // apply Blockly’s CSS
        media: '/assets/blockly-media/', // path for icons like zoom/trash
        scrollbars: true,             // enable scrollbars
        sounds: false,                // disable sounds if you prefer
        oneBasedIndex: false,         // indexing for lists (false = 0-based)
        zoom: {
            controls: true,             // show zoom icons
            wheel: true,                // allow zoom with mouse wheel
            startScale: 1.0,            // initial zoom scale
            maxScale: 3,                // maximum zoom
            minScale: 0.3,              // minimum zoom
            scaleSpeed: 1.2,            // zoom speed
            pinch: true,                // pinch-to-zoom on touch devices
        },
    }

    return (
        <BlocklyWorkspace
            className="blockly-style"
            toolboxConfiguration={MY_TOOLBOX} // this must be a JSON toolbox definition
            workspaceConfiguration={workspaceConfiguration}
            initialXml={xml}
        />
    )
};

export default BlocklyEditor;
