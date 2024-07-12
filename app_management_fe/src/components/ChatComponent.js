import classes from "./css/MessageComponent.module.css";
import profilePicture from "./pictures/defaultProfile.png";

function ChatComponent({name}){
    return (
        <div className={classes.profileContainer}>
           <img src={profilePicture} alt="" className={classes.profile}/>
            <span>{name}</span>
        </div>
    )
}

export default ChatComponent;