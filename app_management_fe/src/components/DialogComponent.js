import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from "./css/Dialog.module.css";
import Message from "./Message";

const DialogComponent = forwardRef(({messages, username, onAdd}, ref) => {

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

    useEffect(() => {
        scrollToButton();
    }, [stateMsg]);

    function addUserMessage(){
        const message = inputRef.current.value;
        onAdd(message);
        updateMessage(message, true);
        inputRef.current.value = "";
    }

    useImperativeHandle(ref, () => ({
        updateMessage,
        updateChat
    }));

    function updateChat(messages){
        const parsed = messages.map(message => ({
            ...message,
            side: message.sender === username
        }));   
        setStateMsg(parsed);
    }

    function updateMessage(message, type = false){
        console.log("in the update");
        if (message.trim() !== ""){
            const newMsg = {
                content: message,
                side: type
            };
            setStateMsg(prevState => [...prevState, newMsg]);
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
});

export default DialogComponent;