import ItemComponent from "../components/ItemComponent";

function Items(){

    const roles = localStorage.getItem("roles");

    return (
        <div>
            <ItemComponent addOption={roles?.includes("admin") || roles?.includes("manager")} />
        </div>
    )
}

export default Items;