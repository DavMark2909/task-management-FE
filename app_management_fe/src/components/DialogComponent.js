import { useRef } from "react";
import classes from "./css/Dialog.module.css";
import Message from "./Message";

function DialogComponent({messages, username, onAdd}){

    const inputRef = useRef();

    const parsed = messages.map(message => ({
        ...message,
        side: message.sender === username
    }));   

    function addMessage(){
        const message = inputRef.current.value;
        if (message.trim() !== ""){
            onAdd(message)
            inputRef.current.value = "";  
        }
    }

    return (
        <div className={classes.main}>
            <ul className={classes.dialog}>
                {parsed.map((content, index) => (
                    <li key={index} className={content.side ? classes.mymessage : classes.sidemessage}>
                        <Message text={content.content} type={content.side}/>
                    </li>
                ))}
            </ul>
            <div className={classes.messagepane}>
                <input placeholder="Type message" ref={inputRef}/>
                <button onClick={addMessage}>Add</button>
            </div>
        </div> 
    );
}

export default DialogComponent;