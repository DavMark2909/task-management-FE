import { useState } from "react";
import { defer, Outlet } from "react-router-dom";
import MessageRootComponent from "../components/MessageRootComponent";
import classes from "./css/Messages.module.css";

function MessageRoot(){

    const [msgType, setMsgType] = useState("All");

    function filterOption(value){
        setMsgType(value);
    }

    function lookFor(value){
        setMsgType(`individual=${value}`);
    }

    return (
        <div className={classes.main}>
        {/* <MessageRootComponent optionMethod={filterOption} searchMethod={lookFor}/> */}
            <Outlet context={{msgType}}/>
        </div>
    );
}

export default MessageRoot;

// async function messageLoader(option){

// }

// export function loader({request}){
//     // const url = new URL(request.url);
//     // const option  = url1.searchParams.get("filter");
//     return defer({
//         messages: messageLoader(option)
//     });
// }