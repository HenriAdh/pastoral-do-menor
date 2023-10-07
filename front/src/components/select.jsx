import React from "react";
import style from './css/select.module.css';

const Select = ({ id, preselect, options, onChange=()=>{}, required=false }) => {
    return (
        <div className={style.divselect} >
            <select 
                name={id} 
                id={id} 
                className={style.select}
                onChange={onChange}
                required={required} 
                defaultValue={0}
            >
                <option 
                    value={0}
                    disabled={true} 
                    className={style.option} 
                >
                    {preselect}
                </option>
                {options.map((opt, index) => (
                    <option 
                        key={index} 
                        value={opt['value']} 
                        className={style.option} 
                    >
                        {opt['desc']}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;