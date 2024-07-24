import ItemComponent from "../components/ItemComponent";
import classes from "./css/Items.module.css";

function Items(){

    const roles = localStorage.getItem("roles");

    return (
        <div className={classes.main}>
            <ItemComponent addOption={roles?.includes("admin") || roles?.includes("manager")} />
        </div>
    )
}

export default Items;