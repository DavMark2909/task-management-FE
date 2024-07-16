import ChatComponent from "./ChatComponent";
import classes from "./css/MessageComponent.module.css";
import { useState, useRef, useEffect } from "react";
import searchPicture from "./pictures/search.png";
import { connect, sendMessage } from "../utils/WebSocketService";
import DialogComponent from "./DialogComponent";

function MessageComponent({content}){

    const [payload, setPayload] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All");
    const searchRef = useRef();
    const [msgType, setMsgType] = useState("All");
    const [updatedChatRooms, setUpdatedChatRooms] = useState(new Set());
    const [activeChat, setActiveChat] = useState(null);
    const username = localStorage.getItem("username");

    useEffect(() => {
        connect(localStorage.getItem("username", onMessageReceived));
    }, []);

    function onMessageReceived(message){
        const receivedMessage = JSON.parse(message);
        const chatName = receivedMessage.chatName;
        if (activeChat && activeChat === chatName){
            addMessageToChat(message);
        } else {
            setUpdatedChatRooms(prevNames => new Set(prevNames).add(chatName));
        }
    }

    function lookFor(){
        const name = searchRef.current.value;
        setMsgType(`individual=${name}`);
    }

    function handleButtonClick(value){
        setActiveBtn(value);
        setMsgType(value);
    }

    function clickChat(chat){
        setActiveChat(chat.name);
    }

    async function fetchChatData() {
        const sender = user;
        const receiver = activeChat.name.split("_").filter(part => part !== username);
        const token = localStorage.getItem('access_token');
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", `Bearer ${token}`);
        const url = `http://localhost:7777/api/messages/${sender}/${receiver}`;
        const res = await fetch(url, {
            method: "GET",
               headers
        });
        const myChatData = await res.json();
        setPayload(myChatData);
    }

    useEffect(() => {
        fetchChatData()
    }, [activeChat]);

// this method is designed to handle the sorting options of the options pane
        // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('access_token');
    //         const headers = new Headers();
    //         headers.set("Content-Type", "application/json");
    //         headers.set("Authorization", `Bearer ${token}`);
    //         //have to read tutorial
    //         let url = `http://localhost:8080/api/messages/option=${msgType}`;
    //         const res = await fetch(url, {
    //             method: "POST",
    //             mode: "cors",
    //             headers,
    //         });
    //         const data = await res.json();
    //         console.log(data);
    //         setChats(data);
    //     };
    //     fetchData();
    // }, [msgType]);

    function addMessage(message){
        sendMessage()
    }

    return (
        <div className={classes.main2}>
            <div className={classes.chats}>
                <div className={classes.chatscontent}>
                    <div className={classes.utils}>
                        <div className={classes.searcher}>
                            <input placeholder="Search for" ref={searchRef}/>
                            <img src={searchPicture} alt="Go" className={classes.picture} onClick={lookFor}/>
                        </div>
                        <div className={classes.options}>
                            <ul className={classes.list2}>
                                <li>
                                    <button className={activeBtn === "All" ? classes.active : classes.btn} disabled={activeBtn === "All"} onClick={() => handleButtonClick("All")}>All</button>
                                </li>
                                <li>
                                    <button className={activeBtn === "Personal" ? classes.active : classes.btn} disabled={activeBtn === "Personal"} onClick={() => handleButtonClick("Personal")}>Personal</button>
                                </li>
                                <li>
                                    <button className={activeBtn === "System" ? classes.active : classes.btn} disabled={activeBtn === "System"} onClick={() => handleButtonClick("System")}>System</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {content ? (
                        <ul className={classes.list}>
                            {content.map((cur, index) => (
                                <li key={index} className={classes.chat} onClick={() => clickChat(cur.name)}>
                                    <ChatComponent content={cur} updated={updatedChatRooms.has(cur.name)} username={username} active={cur.name === activeChat}/>
                                </li>
                            ))}
                        </ul>
                        ) : 
                        (<span>No chats yet</span>)
                    }
                </div>
            </div>
            <div className={payload ? classes.messages : classes.select}> 
                {payload ? (
                    <div>
                        <DialogComponent messages={payload} username={username} onAdd={addMessage}/>
                    </div>
                ) 
                : <span>Select the desired chat</span>
                }
            </div>
        </div>
    )
}

export default MessageComponent;