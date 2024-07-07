import classes from "./css/TaskForm.module.css";
import deleteImage from './pictures/delete.png';

function ListElement({name, method}){
    return <div className={classes.listElement}>
        <span>{name}</span>
        <img src={deleteImage} alt="-" className={classes.image} onClick={() => method(name)}/>
        </div>;
}

export default ListElement; 