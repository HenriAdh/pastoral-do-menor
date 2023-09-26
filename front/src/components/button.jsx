import React from "react";
import './css/button.css';

const Button = ({ id, type='button', text, onClick }) => {
    return (
        <div>
            <input className="input-button" id={id} name={id} type={type} value={text} onClick={onClick} />
        </div>
    )
}

export default Button;