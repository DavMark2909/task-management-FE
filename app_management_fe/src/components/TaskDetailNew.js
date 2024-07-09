import CommentSection from "./CommentSection";
import classes from "./css/NewTaskDetails.module.css";

const doCompleteTask = async (id) => {
    const url = `http://localhost:8080/api/task/complete?id=${id}`;

    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);

    const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers,
    });

    return res;
}

function TaskDetailNew({elements, id}){

    const status = elements?.get("status") === "active";

    const completeTask = async () => {
        const res = await doCompleteTask(id);
        console.log("Task was updataed");
    }

    return (
        // <div className={classes.main}>
            <div className={classes.content}>
                <p>
                    <h2>{elements.get("name")}</h2>
                </p>
                <p>
                    <span>Description</span>
                    <h3>{elements.get("description")}</h3>
                </p>
                <span>{`Task was issued by ${elements.get("issuer")}`}</span>
                {status && (
                    <div className={classes.button}>
                        <button onClick={completeTask}>Complete the task</button>
                    </div>
                )}
            </div>
        // </div>
    )
}

export default TaskDetailNew;