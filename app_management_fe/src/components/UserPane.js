import { useNavigate } from "react-router-dom";
import HomeElement from "./HomeElement";
import classes from "./css/ManagerPane.module.css";
import taskImage from './pictures/145.jpg';
import messageImage from './pictures/message.png';

function UserPane(){
    const navigate = useNavigate();

    function openTasks(){
        navigate("tasks");
    }

    function openMessages(){
        navigate("messages");
    }

    function openItems(){
        navigate("items");
    }

    function openData(){
        navigate("data");
    }

    return (
        <div className={classes.main}>
            <HomeElement name="My Tasks" picture={taskImage} method={openTasks}/>
            <HomeElement name="Messages" picture={messageImage} method={openMessages}/>
            <HomeElement name="Items" picture={messageImage} method={openItems}/>
            <HomeElement name="Data" picture={messageImage} method={openData}/>
        </div>
    );
}

export default UserPane;