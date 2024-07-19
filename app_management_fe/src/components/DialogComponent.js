import { useRef, useState } from "react";
import classes from "./css/Dialog.module.css";
import Message from "./Message";

function DialogComponent({messages, username, onAdd}){

    const inputRef = useRef();
    const listRef = useRef();

    const parsed = messages.map(message => ({
        ...message,
        side: message.sender === username
    }));   

    const [stateMsg, setStateMsg] = useState(parsed);

    const scrollToButton = () => {
        if (listRef.current){
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }  

    function addUserMessage(){
        const message = inputRef.current.value;
        addMessage(message, true);
        inputRef.current.value = "";
    }

    function addMessage(message, type = false){
        if (message.trim() !== ""){
            onAdd(message);
            const newMsg = {
                content: message,
                side: type
            };
            setStateMsg([...setStateMsg, newMsg]);
            scrollToButton();  
        }
    }

    return (
        <div className={classes.main}>
            <ul className={classes.dialog} ref={listRef}>
                {stateMsg.map((content, index) => (
                    <li key={index} className={content.side ? classes.mymessage : classes.sidemessage}>
                        <Message text={content.content} type={content.side}/>
                    </li>
                ))}
            </ul>
            <div className={classes.messagepane}>
                <input placeholder="Type message" ref={inputRef}/>
                <button onClick={addUserMessage}>Add</button>
            </div>
        </div> 
    );
}

export default DialogComponent;