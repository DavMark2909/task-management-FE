import { defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import TaskDetailNew from "../components/TaskDetailNew";
import classes from "./css/TaskPage.module.css";
import CommentSection from "../components/CommentSection";


function TaskDetailPage(){

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    const {comments} = useLoaderData();


    return (
        <div className={classes.main}>
            <TaskDetailNew elements={query} id={id}/>
            <div className={classes.main2}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading comments...</p>}>
                    <Await resolve={comments}>
                        {(object) => <CommentSection comments={object} id={id}/>}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default TaskDetailPage;


async function commentLoader({params}){

    // const url1 = new URL(request.url);
    // const id = url1.searchParams.get("id");
    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    const url = "http://localhost:8080/api/task/comments?id=1";

    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });

    const dataAfter = await response.json();
    console.log(dataAfter);
    return dataAfter;
}

export function loader({request, params}){
    return defer({
        comments: commentLoader(params)
    });
}