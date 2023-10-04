import React from "react";

const CheckBox = ({ id, label, onChange=()=>{} }) => {
    return (
        <div>
            <input type="checkbox" name={id} id={id} onChange={onChange} />
            <label htmlFor={id} >{label}</label>
        </div>
    )
}

export default CheckBox;