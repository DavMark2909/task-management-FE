import classes from "./css/Sorting.module.css";
import { useState } from "react";

function Sorting(){

    const [filter, setFilter] = useState({
        priority: false,
        creation: false,
        due: false
    });

    function handleCheckBox(e){
        const {name, checked} = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: checked
        }));
    }

    function parseSorting(){

    }

    let options = undefined;

    if (filter.priority){
        options = (<div>Reverse</div>)
    }
    else if (filter.creation){
        options = (<div>Creation</div>)
    }
    else if(filter.due){
        options = (<div>Due</div>)
    }

    return (
        <div className={classes.filter}>
                <h3>Sorting options</h3>
                <label className={classes.check}>
                    <input type="checkbox" name="priority" onChange={handleCheckBox} checked={filter.priority}/>
                    Sort by priority
                </label>
                <label className={classes.check}>
                    <input type="checkbox" name="creation" onChange={handleCheckBox} checked={filter.creation}/>
                    Sort by date
                </label>
                <label className={classes.check}>
                    <input type="checkbox" name="due" onChange={handleCheckBox} checked={filter.due}/>
                    Sort by due date
                </label>
                <h4>Additional options</h4>
                {options && (
                    <div>
                        <div>
                            {options}
                        </div>
                        <div className={classes.bottom}>
                            <button className={classes.button} onClick={parseSorting}>Apply</button>
                        </div>
                    </div>
                )}
                
            </div>
    );
}

export default Sorting;