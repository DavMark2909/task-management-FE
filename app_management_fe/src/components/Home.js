import ManagerPane from "./ManagerPane";
import UserPane from "./UserPane";

import classes from "./css/Home.module.css";

function Home({roles}){

    localStorage.setItem("roles", roles);

    return (
        <>
            <main className={classes.main}>
                {roles?.includes("admin") || roles?.includes("manager") ? <ManagerPane /> : <UserPane />}
            </main>
        </>
    );
}

export default Home;

