import React from "react";
import './css/input-field.css'

const InputField = ({ id, label, type='text', required=true }) => {
    return (
        <div className="DivInput">
            <input name={id} id={id} type={type} required={required} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default InputField;