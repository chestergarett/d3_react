import { useState } from 'react';

const options = [
    {value: 'dog', label: 'Dog'},
    {value: 'cat', label: 'Cat'},
    {value: 'hamster', label: 'Hamster'},
    {value: 'parrot', label: 'Parrot'},
    {value: 'spider', label: 'Spider'},
    {value: 'goldfish', label: 'Goldfish'},
];

const Menus = () => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);
    
    const selectedValueHandler = (e) => {
        setSelectedValue(e.target.value)
        console.log(selectedValue)
    }
    return(
        <div>
            <label for='pet-select'>Choose a pet</label>

            <select id='pet-select' onChange={e=>selectedValueHandler(e)}>
                {options.map( option => {
                    return(
                        <option 
                            value={option.value} 
                            key={option.value}
                            selected={option.value===selectedValue}
                        >
                            {option.label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Menus;