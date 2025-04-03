import React from 'react';
import './drop-down-menu.styles.css';

export const DropDown = ({ types, selectedType, handleTypeChange }) => {
    return (
        <select
            value={selectedType}
            onChange={handleTypeChange}
            className="dropdown-menu"
        >
            <option value="">Types</option>
            {types.map(type => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};
