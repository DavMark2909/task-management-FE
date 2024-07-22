import classes from "./css/ItemPage.module.css";
import ItemComponent from "../components/ItemComponent";

function Items(){

    const roles = localStorage.getItem("roles");

    return (
        <div className={classes.main}>
            <ItemComponent addOption={roles?.includes("admin") || roles?.includes("manager")} />
        </div>
    )
}

export default Items;