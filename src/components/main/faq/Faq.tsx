import './Faq.css';
import React, {useState} from "react";
import Question from "./Question/Question";

const question = [
    {
        question: <span>Was muss ich <b>mitnehmen?</b></span>,
        answer: (
            <>
                <p>Du solltest folgendes dabei haben:</p>
                <ul>
                    <li>Wasserdichter Behälter (z.B. Dry-Bag)</li>
                    <li>Kleines Handtuch, Badehose</li>
                    <li>Sonnencreme</li>
                    <li>Dein Floatie (z.B. Luftmatratze)</li>
                    <li>DEINE FREUNDE</li>
                </ul>
            </>
        ),
    },
    {
        question: <span>Ist der <b>Kanal</b> nicht ur <b>grausig?</b></span>,
        answer: (
            <>
                <p>
                    Die Wasserqualität des Donaukanals unterscheidet sich im Allgemeinen
                    nicht von der Wasserqualität des Donau-Hauptstroms.
                </p>
                <p>
                    Es werden laut der Stadt Wien keine ungeklärten Abwässer in den
                    Donaukanal eingeleitet.
                </p>
                <p>
                    Die grünliche Farbe und Trübung des Wasser kommt vom Schlamm der von
                    der Donau mitgetragen wird, das ist völlig normal für einen Fluss von
                    dieser Grösse.
                </p>
            </>
        ),
    },
    {
        question: <span>Ist das überhaupt <b>legal?</b></span>,
        answer: (
            <>
                <p>
                    JA! Das Schwimmen ist grundsätzlich erlaubt, der Donaukanal ist
                    jedoch keine offizielle Badestelle.
                </p>
                <p>
                    In einem Umkreis von 100m um große Objekte wie Schiffsanlegestellen
                    oder Arbeitsplattformen und bei den Schleusenanlagen ist das
                    Schwimmen verboten. Dies betrifft uns aber nicht.
                </p>
            </>
        ),
    },
    {
        question: <span>Fahren da nicht <b>Schiffe?</b></span>,
        answer: (
            <p>
                Selten, aber ja. Sollte ein Schiff kommen ist es ratsam einfach kurz
                zur Seite zu schwimmen.
            </p>
        ),
    },
];

const Faq = () => {
    const [opened, setOpened] = useState(new Array(question.length).fill(false));

    const handleQuestionClick = (index: number) => {
        console.log(index)
        setOpened((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="container--vertical">
            {question.map((entry, index) => (
                <Question
                    key={"q" + index}
                    question={entry.question}
                    opened={opened[index]}
                    onClick={() => handleQuestionClick(index)}
                >
                    {entry.answer}
                </Question>
            ))}
        </div>
    );
};

export default Faq;