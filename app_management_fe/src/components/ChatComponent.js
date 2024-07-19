import classes from "./css/MessageComponent.module.css";
import profilePicture from "./pictures/defaultProfile.png";

function ChatComponent({content, updated, username, active}){

    let name;

    if (content.personal){
        const parts = content.name.split("_");
        name = parts.filter(part => part !== username);
    } else {
        name = content.name;
    }

    return (
        <div className={classes.profileContainer}>
            <img src={profilePicture} alt="" className={classes.profile}/>
            <div className={classes.chatName}>
                <div className={classes.divName}>
                    <h3>{name}</h3>
                </div>
                {(updated && !active) && <div className={classes.circle}></div>}
                <div className={classes.divSpan}>
                    <span>{content.time}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent;