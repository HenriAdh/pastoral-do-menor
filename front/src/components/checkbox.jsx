import React from "react";
import css from './css/checkBox.module.css';

const CheckBox = ({ id, label, onChange=()=>{} }) => {
    return (
        <div className={css.checkbox}>
            <input type="checkbox" name={id} id={id} onChange={onChange} className={css.check} />
            <label htmlFor={id} className={css.label} >{label}</label>
        </div>
    )
}

export default CheckBox;