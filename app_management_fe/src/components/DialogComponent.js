import { useRef } from "react";
import classes from "./css/Dialog.module.css";

function DialogComponent({messages, username}){

    const inputRef = useRef();

    const parsed = messages.map(message => ({
        ...message,
        side: message.sender === username
    }));   

    return (
        <div>
            <div className={classes.dialog}>
                {parsed.map((content, index) => (
                    <Message content={content}/>
                ))}
            </div>
            <div className={classes.messagepane}>
                <input placeholder="Type message" ref={inputRef}/>
                <button>Add</button>
            </div>
        </div>
    );
}

export default DialogComponent;