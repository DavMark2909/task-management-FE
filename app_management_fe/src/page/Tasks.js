import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import TaskList from "../components/TaskList";
import Sorting from "../components/Sorting";

import classes from "./css/Tasks.module.css";
import TaskDetail from "../components/TaskDetails";
import TaskDetailNew from "../components/TaskDetailNew";

function Tasks({status}){

    const {tasks, created} = useLoaderData();

    let data;

    if (status === "created"){
        data = created;
    } else {
        data = tasks;
    }

    const navigate = useNavigate();

    const [selectedTask, setTask] = useState(null);

    function handleTaskClick(task){
        if (status !== 'created'){
            const issuer = task.issuer;
            const name = task.name;
            const description = task.description;
            const id = task.id;
            const priority = task.priority;
            const status = task.status;
            const baseUrl =  "/home/tasks/task-detail";
            const queryString = createQueryString({id, issuer, name, description, priority, status});
            const fullUrl = `${baseUrl}?${queryString}`;
            navigate(fullUrl); 
        } else {
            setTask(task);
        }
    }

    function handleTaskClose(){
        setTask(null);
    }

    function createQueryString(params){
        return new URLSearchParams(params).toString();
    }

    function updateTheTask(task){
        // if (status === 'created'){
            const receivers = task.receivers.map((receiver) => receiver.fullname);
            const newTask = {...task, "personal":!task.personal, "receivers": receivers};
            const baseUrl = "/home/tasks/update";
            const queryString = createQueryString(newTask);
            const fullUrl = `${baseUrl}?${queryString}`;
            navigate(fullUrl);
        // } else {
        //     const issuer = task.issuer;
        //     const name = task.name;
        //     const description = task.description;
        //     const id = task.id;
        //     const priority = task.priority;
        //     const baseUrl = "/home/tasks/create-request";
        //     // const baseUrl =  "/home/tasks/task-detail";
        //     const queryString = createQueryString({issuer, name, description, id, priority});
        //     const fullUrl = `${baseUrl}?${queryString}`;
        //     navigate(fullUrl); 
        // }
    }

    function parseSorting(){

    }

    return ( 
        <div className={classes.pageContainer}>
            <div className={selectedTask ? classes.blurred : classes.container}>
            <Sorting />
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={data}>
                        {(object) => 
                            <div className={classes.center}>
                                <TaskList tasks={object} method={handleTaskClick}/>
                            </div>
                        }
                    </Await>
            </Suspense>
            </div>
            {selectedTask && (
                <div className={classes.taskDetailPane}>
                    <TaskDetail task={selectedTask} onClose={handleTaskClose} redirect={updateTheTask} status={status}/>
                </div>
            )}
        </div>
    );
}

export default Tasks;

async function loadTasks(){ 

    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    headers.set("Authorization", `Bearer ${token}`);
    console.log(token);
    let url = "http://localhost:8080/api/task/my-tasks";
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });

    const tasks = await response.json();
    return tasks;
}

async function createdTasks(){
    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    headers.set("Authorization", `Bearer ${token}`);
    let url = "http://localhost:8080/api/task/my-created-tasks";

    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });

    const tasks = await response.json();
    return tasks;
}

export function loader(){
    return defer({
        tasks: loadTasks(),
        created: createdTasks(),
    });
}

