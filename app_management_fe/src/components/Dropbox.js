import { useState } from "react";
import classes from "./css/TaskForm.module.css";

function Dropbox({options, starting, onChange}){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(starting);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    }

    return (
        <div className={classes.dropdown}>
            <div className={`${classes.select} ${isOpen ? classes.selectClicked : ''}`} onClick={toggleDropdown}>
                <span className={classes.selected}>{selectedOption}</span>
                <div className={`${classes.caret} ${isOpen ? classes.caretRotate : ''}`}></div>
            </div>
            <ul className={`${classes.menu} ${isOpen ? classes.menuOpen : ''}`}>
                {options.map((option) => (
                    <li 
                        key={option} 
                        className={selectedOption === option ? classes.active : ''} 
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul> 
        </div>
    );
}

export default Dropbox;