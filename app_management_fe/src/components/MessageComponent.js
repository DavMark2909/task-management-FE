import ChatComponent from "./ChatComponent";
import classes from "./css/MessageComponent.module.css";
import { useState } from "react";
import searchPicture from "./pictures/search.png";

function MessageComponent({content}){

    const [payload, setPayload] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All");

    async function loadChat(chat){
        // const chatId = chat.id;
    }

    return (
        <div className={classes.main2}>
            <div className={classes.chats}>
                <div className={classes.chatscontent}>
                    <div className={classes.utils}>
                        <div className={classes.searcher}>
                            <input placeholder="Search for"/>
                            <img src={searchPicture} alt="Go" className={classes.picture}/>
                        </div>
                        <div className={classes.options}>
                            <ul className={classes.list2}>
                                <li>
                                    <button className={activeBtn === "All" ? classes.active : classes.btn}>All</button>
                                </li>
                                <li>
                                    <button className={activeBtn === "Personal" ? classes.active : classes.btn} >Personal</button>
                                </li>
                                <li>
                                    <button className={activeBtn === "System" ? classes.active : classes.btn} >System</button>
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