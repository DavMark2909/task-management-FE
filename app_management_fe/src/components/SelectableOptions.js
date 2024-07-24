import { useState } from "react";
import classes from "./css/SelectableOptions.module.css";

function SelectableOptions({options}){

    const [selectedOptions, setSelectedOption] = useState();

    function handleCheckBox(value){
        if (value === selectedOptions){
            setSelectedOption(null);
        } else {
            setSelectedOption(value);
        }
    }

    return (
        <>
            <ul className={classes.list}>
                {options.map((option, index) => (
                    <li key={index}>
                        <label className={classes.check}>
                            <input type="checkbox" onChange={() => handleCheckBox(option)} checked={selectedOptions === option}/>
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
            <div className={classes.btnDiv}>
                <button>Apply</button>
            </div>
        </>
    );
}

export default SelectableOptions;