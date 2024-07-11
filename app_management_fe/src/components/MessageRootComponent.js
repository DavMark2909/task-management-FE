import { useState, useRef } from "react";
import classes from "./css/MsgRoot.module.css";
import searchPicture from "./pictures/search.png";

function MessageRootComponent({searchMethod, optionMethod}){

    const searchRef = useRef();
    const [activeBtn, setActiveBtn] = useState("All");

    function handleButtonClick(value){
        setActiveBtn(value);
        optionMethod(value);
    }

    return (
        // <div >
            <header className={classes.main}>
                <div className={classes.searcher}>
                    <input defaultValue="Search for..." ref={searchRef}/>
                    <img src={searchPicture} alt="Go" onClick={searchMethod} className={classes.picture}/>
                </div>
                <div className={classes.options}>
                    <ul className={classes.list}>
                        <li>
                            <button className={activeBtn === "All" ? classes.active : classes.btn} onClick={() => handleButtonClick("All")}>All</button>
                        </li>
                        <li>
                            <button className={activeBtn === "Personal" ? classes.active : classes.btn} onClick={() => handleButtonClick("Personal")}>Personal</button>
                        </li>
                        <li>
                            <button className={activeBtn === "System" ? classes.active : classes.btn} onClick={() => handleButtonClick("System")}>System</button>
                        </li>
                    </ul>
                </div>
            </header>
        // </div>
    );
}

export default MessageRootComponent;