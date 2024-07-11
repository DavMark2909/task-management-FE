import classes from "./css/MessageComponent.module.css";
import profilePicture from "./pictures/defaultProfile.png";

function ChatComponent({name}){
    return (
        <div>
            <img src={profilePicture} alt=""/>
            <span>{name}</span>
        </div>
    )
}

export default ChatComponent;