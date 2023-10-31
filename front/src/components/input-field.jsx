import React from "react";
import './css/input-field.css'

const InputField = ({ id, label, type='text', onInput=()=>{}, required=true, value, min, max}) => {    
    return (
        <div className="DivInput">
            <input 
                name={id} 
                id={id} 
                type={type} 
                onInput={onInput} 
                required={required}
                value={value ? value:undefined}
                min={min ? min:undefined}
                max={max ? max:undefined}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default InputField;