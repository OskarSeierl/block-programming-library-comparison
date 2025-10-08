import React from "react";
import './RunningText.css';

const text: string = "This is text - This is text - This is text - This is text - This is text - This is text - This is text - This is text - This is text - This is text - This is text - This is text -";

const RunningText: React.FC = () => {
    return (
        <div className="running-text">
            <div className="running-text__marquee">
                <span>{text}</span>
            </div>
            <div className="running-text__marquee">
                <span>{text}</span>
            </div>
        </div>
    );
};

export default RunningText;