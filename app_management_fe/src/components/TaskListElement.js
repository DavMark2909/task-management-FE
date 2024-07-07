import classes from "./css/TaskList.module.css";

function TaskListElement({task}){

    return (
        <>
            <div className={classes.content}>
                <div className={classes.top}>
                    <span>{task.name}</span>
                </div>
                <div className={classes.bottom}>
                    <span>{task.startDate}</span>
                    <span>{task.priority}</span>
                </div>
            </div>
        </>
    );

}

export default TaskListElement;