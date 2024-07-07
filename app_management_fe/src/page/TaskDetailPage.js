import { defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import TaskDetailNew from "../components/TaskDetailNew";


function TaskDetailPage(){

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");


    return (
        <div>
            <TaskDetailNew elements={query} id={id}/>
        </div>
    );
}

export default TaskDetailPage;


// async function commentLoader({params}){

//     const id = params.id;
//     const token = localStorage.getItem('access_token');
//     const headers = new Headers();
//     headers.set("Content-Type", "application/json");
//     headers.set("Authorization", `Bearer ${token}`);
//     const url = "http://localhost:8080/api/task/comments";
//     const body = {"taskId": id};

//     const response = await fetch(url, {
//         method: "GET",
//         mode: "cors",
//         headers,
//         body: JSON.stringify(body)
//     });

//     const dataAfter = await response.json();
//     return dataAfter;
// }

// export function loader(){
//     return defer({
//         comments: commentLoader()
//     });
// }