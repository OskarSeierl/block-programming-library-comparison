import './Question.css';
import React from "react";

interface Props {
    children: React.ReactNode;
    question: React.ReactNode;
    opened: boolean;
    onClick: () => void;
}

const Question = ({children, question, opened, onClick}: Props) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <div className={"collapsible" + (opened ? " opened" : "")} onClick={onClick}>
            <button className="collapsible__button">{question}</button>
            <div
                style={{visibility: opened ? "visible" : "hidden", maxHeight: opened ? contentRef.current?.scrollHeight : "0"}}
                className="collapsible__content"
                ref={contentRef}
            >
                {children}
            </div>
        </div>
    );
};

export default Question;