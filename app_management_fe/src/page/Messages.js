import { useEffect, useState } from "react";
import MessageComponent from "../components/MessageComponent";
import { useOutletContext } from "react-router-dom";

function Messages(){

    const dummy = [
        {"username": "User 1"},
        {"username": "User 2"},
        {"username": "User 3"},
        {"username": "User 4"},
    ];

    

    const {msgType} = useOutletContext();
    console.log(msgType);
    const [chats, setChats] = useState(dummy);

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


    return <MessageComponent content={chats}/>
}

export default Messages;