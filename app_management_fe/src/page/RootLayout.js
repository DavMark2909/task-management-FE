import { Outlet, useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";
import MainHeader from "../components/MainHeader";

function RootLayout(){

    const {home} = useLoaderData();

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={home}>
                    {(object) => <MainHeader name={object.name} lastname={object.lastname}/>}
                </Await>
            </Suspense>
            <main>
                <Outlet />
            </main>
        </>
      );


}

export default RootLayout;

async function homeLoader(){
    const token = localStorage.getItem('access_token');
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${token}`);
    const url = "http://localhost:8080/api/main/load";
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers
    });

    const data = await response.json();
    localStorage.setItem("username", data.username);
    localStorage.setItem("roles", data.roles);
    return data;
}

export function loader(){
    return defer({
        home: homeLoader(),
      });
}