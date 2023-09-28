import React from "react";
import './css/input-field.css'

const InputField = ({ id, label, type='text', onInput=()=>{}, required=true }) => {
    return (
        <div className="DivInput">
            <input name={id} id={id} type={type} onInput={onInput} required={required} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default InputField;