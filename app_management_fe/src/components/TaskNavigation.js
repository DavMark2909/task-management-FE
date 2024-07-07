import { NavLink } from "react-router-dom";

import classes from "./css/TaskNavigation.module.css";

function TaskNavigation(){ 

    const roles = localStorage.getItem("roles");

    if (roles.includes("manager") || roles.includes("admin")){
        return (
            <header className={classes.header}>
                <nav>
                    <ul className={classes.list}>
                        <li>
                            <NavLink to="/home/tasks" className={({isActive}) => isActive ? classes.active : undefined} end>My Tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tasks/created" className={({isActive}) => isActive ? classes.active : undefined} end>Created Tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tasks/create" className={({isActive}) => isActive ? classes.active : undefined} end>Create task</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tasks/requests" className={({isActive}) => isActive ? classes.active : undefined} end>Requests</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
    else {
        return (
            <header className={classes.header}>
                <nav>
                    <ul className={classes.list}>
                        <li>
                            <NavLink to="/home/tasks" className={({isActive}) => isActive ? classes.active : undefined} end>My Tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tasks/completed" className={({isActive}) => isActive ? classes.active : undefined} end>Completed tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tasks/create-request" className={({isActive}) => isActive ? classes.active : undefined} end>Create request</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
}
}

export default TaskNavigation;