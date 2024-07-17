import classes from "./css/Dialog.module.css";

function Message({text, type}){

    return (
        <div className={type ? classes.rightMessage : classes.leftMessage}>
            <span>{text}</span>
        </div>
    )
}

export default Message;