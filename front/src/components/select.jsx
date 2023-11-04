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
                defaultValue={'N/A'}
            >
                <option 
                    value={'N/A'}
                    disabled={true} 
                    className={style.option}
                >
                    {preselect}
                </option>
                {options.length > 0 ? options.map((opt, index) => (
                    <option 
                        key={index} 
                        value={opt['value']} 
                        className={style.option} 
                    >
                        {opt['desc']}
                    </option>
                )): <></>}
            </select>
        </div>
    )
}

export default Select;