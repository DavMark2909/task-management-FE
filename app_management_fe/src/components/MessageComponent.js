import ChatComponent from "./ChatComponent";
import classes from "./css/MessageComponent.module.css";
import { useState, useRef, useEffect } from "react";
import searchPicture from "./pictures/search.png";
import { connect, sendMessage } from "../utils/WebSocketService";
import DialogComponent from "./DialogComponent";

function MessageComponent(){

    const [payload, setPayload] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All");
    const searchRef = useRef();
    const dialogRef = useRef();
    const chatRef = useRef("");
    const [updatedChatRooms, setUpdatedChatRooms] = useState([""]);
    const updatedChatRef = useRef(updatedChatRooms);
    const [msgType, setMsgType] = useState("All");
    const [activeChat, setActiveChat] = useState();
    const [loadingChats, setLoadingChats] = useState(true);
    const [chats, setChats] = useState(null);
    
    const username = localStorage.getItem("username");
    const token = localStorage.getItem('access_token');;
    

    useEffect(() => {
        connect(localStorage.getItem("username"), onMessageReceived, token);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:7777/chats?username=${username}`;
            const headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
            const res = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers
            });
            if (!res.ok){
                console.log("PIZDA EBANNAYA BLYAT VSEH EBAL SYKA");
            }
            const data = await res.json();
            setChats(data);
            setLoadingChats(false);
        };
        fetchData();
    }, []);

    function onMessageReceived(message){
        const parsed = JSON.parse(message.body);
        const chatName = parsed.chatName;
        const content = parsed.content;
        console.log(content);
        if (chatRef.current === chatName){
            dialogRef.current.updateMessage(content);
        } else {
            setUpdatedChatRooms(prevNames => {
                const newChatRooms = [...prevNames, chatName];
                updatedChatRef.current = newChatRooms; // Update ref
                return newChatRooms;
            });
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
        console.log("After click the name is ", chat);
        chatRef.current = chat;
        setUpdatedChatRooms(prevNames => {
            const newChatRooms = prevNames.filter(name => name !== chat);
            updatedChatRef.current = newChatRooms; // Update the ref
            return newChatRooms;
        });
        setActiveChat(chat);
    }

    async function fetchChatData() {
        if (activeChat){
            const receiver = activeChat.split("_").filter(part => part !== username);
            const headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
            const url = `http://localhost:7777/chats/${username}/${receiver}`;
            const res = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers
            });
            const myChatData = await res.json();
            if (payload){
                dialogRef.current.updateChat(myChatData);
            } else{
                setPayload(myChatData);
            }
        }
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
        const parts = activeChat.split("_");
        const receiver = parts.filter(part => part !== username);
        sendMessage(message, username, receiver[0], false);
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
                    {loadingChats ? <span>Loading chats...</span> : (
                        chats ? (
                            <ul className={classes.list}>
                                {chats.map((cur, index) => (
                                    <li key={index} className={cur.chatName === activeChat ? classes.activeChat : classes.chat} onClick={() => clickChat(cur.chatName)}>
                                        <ChatComponent content={cur} updated={updatedChatRef.current.includes(cur.chatName)} username={username} active={cur.chatName === activeChat}/>
                                    </li>
                                ))}
                            </ul>
                        ) : 
                            (<span>No chats yet</span>)
                    )
                    }
                </div>
            </div>
            <div className={payload ? classes.messages : classes.select}> 
                {payload ? (
                    <DialogComponent ref={dialogRef} messages={payload} username={username} onAdd={addMessage}/>
                ) 
                : <span>Select the desired chat</span>
                }
            </div>
        </div>
    )
}

export default MessageComponent;