import React from "react";
import "./CustomSelect.css"

const CustomSelect = ({ id, label, value, options, onChange }) => {
    return (
        <div className="select-wrapper">
            <label className="label" htmlFor={id}>{label}</label>
            <select className="select" id={id} value={value} onChange={onChange}>
                <option value="">All</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default CustomSelect;
