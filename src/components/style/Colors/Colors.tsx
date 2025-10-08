import React from "react";
import './Colors.css';

interface Color {
    name: string;
    hex: string;
}

const colors: Color[] = [
    { name: "Luftmatratze", hex: "#F9D1DA" },
    { name: "Donaukanal", hex: "#608070" },
    { name: "Badehose", hex: "#404293" },
    { name: "Platzwunde", hex: "#E51B40" },
    { name: "Ente", hex: "#F08A10" },
    { name: "16er", hex: "#F3E735" }
];

const Colors: React.FC = () => {
    return (
        <div className="container--horizontal">
            {colors.map((color) => (
                <div key={color.name} className="colors__item">
                    <div
                        className="colors__color"
                        style={{ backgroundColor: color.hex }}
                    ></div>
                    <div>
                        {color.name}
                        <br/>
                        Hex: {color.hex}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Colors;