import React from 'react';
import { ReactTyped } from "react-typed";
import "./home.css"

function Type() {
    return (
        <div className="typing-container">
            <ReactTyped
                strings={['Welcome to your Life Log!',
                    "Consistency beats motivation",
                    "Reflect, Relax, Repeat",
                    "Your journey, your story",
                    "Small steps, big impact",
                ]}
                typeSpeed={50}
                backSpeed={30}
                once
            />
        </div>
    );
}
export default Type;
