import { Outlet } from "react-router-dom";

import TaskNavigation from "../components/TaskNavigation";

function TaskRoot(){
    return (
        <>
            <TaskNavigation />
            <Outlet />
        </>
    );
}

export default TaskRoot;