import CommentSection from "./CommentSection";
import classes from "./css/NewTaskDetails.module.css";

function TaskDetailNew({elements, id}){

    const status = elements?.get("status") === "Active";

    return (
        <div className={classes.main}>
            <div className={classes.content}>
                <p>
                    <h2>{elements.get("name")}</h2>
                </p>
                <p>
                    <span>Description</span>
                    <h3>{elements.get("description")}</h3>
                </p>
                <span>{`Task was issued by ${elements.get("issuer")}`}</span>
            </div>
            
            <CommentSection id={id} />
        </div>
    )
}

export default TaskDetailNew;