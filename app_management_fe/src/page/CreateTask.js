import { useLoaderData } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { defer, Await } from "react-router-dom";
import { Suspense } from "react";

function CreateTask(){
    const {roles} = useLoaderData();

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={roles}>
                    {(object) => <TaskForm method="post" roles={object}/>}
                </Await>
            </Suspense>
        </>
    );
}

export default CreateTask;

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