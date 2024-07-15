import classes from "./css/Dialog.module.css";

function Message({content}){

    return (
        <div className={content.side ? classes.mymessage : classes.sidemessage}>
            <span>{content.content}</span>
        </div>
    );

}

export default Message;