import { useLocation, useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import TaskForm from "../components/TaskForm";

function UpdateTask(){

    const query = new URLSearchParams(useLocation().search);

    const {roles} = useLoaderData();

    return (
        <>
            <div style={{'justifyContent':"center", "alignItems":"center"}}>
                <h2>Update task</h2>
            </div>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={roles}>
                    {(object) => <TaskForm method="patch" roles={object} event={query}/>}
                </Await>
            </Suspense>
        </>
    );
}

export default UpdateTask;

async function roleLoader(){
    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "text/plain");
    headers.set("Authorization", `Bearer ${token}`);
    const url = "http://localhost:8080/api/task/roles";
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });

    const roles = await response.text();
    return roles;
}

export function loader(){
    return defer({
        roles: roleLoader(),
      });
}

