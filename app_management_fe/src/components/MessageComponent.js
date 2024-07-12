import ChatComponent from "./ChatComponent";
import classes from "./css/MessageComponent.module.css";
import { useState, useRef } from "react";
import searchPicture from "./pictures/search.png";

function MessageComponent({content}){

    const [payload, setPayload] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All");
    const searchRef = useRef();
    const [msgType, setMsgType] = useState("All");

    function lookFor(){
        const name = searchRef.current.value;
        setMsgType(`individual=${name}`);
    }

    function handleButtonClick(value){
        // have to optimize to prevent double rendering
        setActiveBtn(value);
        setMsgType(value);
    }

    // i am not sure if this one is still needed
    async function loadChat(chat){
        // const chatId = chat.id;
    }

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
                                <li key={index} className={classes.chat} onClick={() => loadChat(cur)}>
                                    <ChatComponent name={cur.name} />
                                </li>
                            ))}
                        </ul>
                        ) : 
                        (<span>No chats yet</span>)
                    }
                </div>
            </div>
            <div className={payload ? classes.messages : classes.select}> 
                <span>Select the desired chat</span>
            </div>
        </div>
    )
}

export default MessageComponent;