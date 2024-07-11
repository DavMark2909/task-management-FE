import { useEffect } from "react";
import MessageComponent from "../components/MessageComponent";
import { useOutletContext } from "react-router-dom";

function Messages(){

    const {msgType} = useOutletContext();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const headers = new Headers();
            headers.set("Content-Type", "application/json");
            headers.set("Authorization", `Bearer ${token}`);
            //have to read tutorial
            let url = "http://localhost:8080/api/task/my-created-tasks";


        };
        fetchData();
    }, [msgType]);

    return <MessageComponent />
}

export default Messages;