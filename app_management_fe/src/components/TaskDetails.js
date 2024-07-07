import classes from "./css/TaskDetails.module.css";
import {format, parse} from 'date-fns';

function TaskDetail({task, onClose, redirect, status}){

    let data;

    if (status === 'created'){
        const receivers = task.receivers;
        data = (
            <div>
                <label>Recievers</label>
                {receivers.map((receiver) => (
                <ul className={classes.list}>
                    <li key={receiver.username} onClick={() => openUserData(receiver.username)} className={classes.receivers}>
                        <div>{receiver.fullname}</div>
                    </li>
                </ul>
                ))}
            </div>
        );
    } else {
        data = (
            <>
                <label>Created by</label>
                <span>{task.issuer}</span>
            </>
        );
   
    }
    // const receivers = task.receivers;


    function convertToDate(data){
        let initPart = data.substring(0,10);
        const date = parse(initPart, 'yyyy-MM-dd', new Date());
        return format(date, "MMMM do, yyyy");
    }

    function openUserData(username){
        console.log("redirecting to the user page");
    }


    return (
        <div className={classes.container}>
            <h2>{task.name}</h2>
            <h3>{task.description}</h3>
            <span>{"The issue date: " + convertToDate(task.startDate)}</span>
            <span>{"Due date: " + convertToDate(task.endDate)}</span>
            <span>{"Priorority: " + task.priority}</span>
            {data}
            <div className={classes.actions}>
                <button onClick={onClose} className={classes.closeBtn}>Close</button>
                <button className={classes.updateButton} onClick={() => redirect(task)}>Update</button>
            </div>
        </div>
    );
}

export default TaskDetail;