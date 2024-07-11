import { useState } from "react";
import { defer, Outlet } from "react-router-dom";
import MessageRootComponent from "../components/MessageRootComponent";

function MessageRoot(){

    const [msgType, setMsgType] = useState("All");

    function filterOption(value){
        setMsgType(value);
    }

    function lookFor(value){
        setMsgType(`individual=${value}`);
    }

    return (
        <>
        <MessageRootComponent optionMethod={filterOption} searchMethod={lookFor}/>
        <Outlet context={{msgType}}/>
        </>
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