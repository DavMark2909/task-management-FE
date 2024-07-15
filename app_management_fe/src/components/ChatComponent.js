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
        <div className={active ? classes.activeContainer : updated ? classes.updatedConainer : classes.profileContainer}>
           <img src={profilePicture} alt="" className={classes.profile}/>
            <span>{name}</span>
            <span>{content.time}</span>
        </div>
    )
}

export default ChatComponent;