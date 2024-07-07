import classes from "./css/TaskList.module.css";
import TaskListElement from "./TaskListElement";

function TaskList({tasks, method}){

    return (
        <div>
            <div className={classes.tasks}>
                <ul className={classes.list}>
                    {tasks.map((cur) => (
                        <li key={cur.id} className={classes.task} onClick={() => method(cur)}>
                            <TaskListElement task={cur}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskList;