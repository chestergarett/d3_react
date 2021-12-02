import { useState } from 'react';


const Dropdown = ({options, id, selectedValue, onSelectedValueChange}) => {
    
    return(
        <select id={id} onChange={e=>onSelectedValueChange(e.target.value)}>
            {options.map( ({value,label}) => {
                return(
                    <option 
                        value={value} 
                        key={value}
                        selected={value===selectedValue}
                    >
                        {label}
                    </option>
                )
            })}
        </select>
    )
}

export default Dropdown;