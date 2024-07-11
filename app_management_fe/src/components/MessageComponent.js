import ChatComponent from "./ChatComponent";
import classes from "./css/MessageComponent.module.css";

function MessageComponent({content}){

    async function loadChat(chat){
        // const chatId = chat.id;
    }

    return (
        <div className={classes.main}>
            <div className={classes.chats}>
                <ul className={classes.list}>
                    {content ? (
                        content.map((cur, index) => (
                            <li key={index} className={classes.chat} onClick={() => loadChat(cur)}>
                                <ChatComponent name={cur.name} />
                            </li>
                        ))
                    ) : (<span>No chats yet</span>)}
                </ul>
            </div>
            <div className={classes.messages}>

            </div>
        </div>
    )
}

export default MessageComponent;