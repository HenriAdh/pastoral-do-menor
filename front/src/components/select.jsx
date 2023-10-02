import React from "react";

const Select = ({ id, preselect, options }) => {
    return (
        <div>
            <select name={id} id={id}>
                <option value selected disabled={true} >{preselect}</option>
                {options.map((opt, index) => <option key={index} value={opt['value']}>{opt['desc']}</option>)}
            </select>
        </div>
    )
}

export default Select;