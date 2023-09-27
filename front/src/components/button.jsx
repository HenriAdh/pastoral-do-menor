import React from "react";
import './css/button.css';

const Button = ({ id, type='button', text, onClick=()=>{} }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <div className="DivInput-button">
            <input className="input-button" id={id} name={id} type={type} value={text} onClick={handleClick} />
        </div>
    )
}

export default Button;