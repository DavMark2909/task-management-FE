import { useEffect, useState } from "react";
import { getRequest } from "../utils/RequestHandler";
import classes from "./css/ItemComponent.module.css";

function ItemComponent({addOption}){

    const token = localStorage.getItem("token");
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [items, setItems] = useState();
    const [itemLoading, setItemLoading] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            const url = "";
            try{
                const data = await getRequest(url, token);
                setCategories(data);
                setCategoryLoading(false);
            } catch (error){
                setCategoryLoading(false);
                setError("Error loading categories");
            }
        };
        fetchCategories();
    },[]);

    useEffect(() => {
        const fetchCategory = async() => {
            const url = `http://?category=${selectedCategory}`;
            try{
                const items = await getRequest(url, token);
                setItems(items);
                setItemLoading(false);
            } catch (error){
                setItemLoading(false);
                setError("Error laoding items");
            }
        };
        fetchCategory();
    }, [selectedCategory]);

    function handleCategory(name){
        setSelectedCategory(name);
    }

    return (
        <div className={classes.main}>
            <div className={classes.filterPane}>
                <div className={classes.filterName}>
                    <h2>Category</h2>
                </div>
                <div className={chatLoading ? classes.filterOptionsLoad : classes.filterOptions}>
                    {categoryLoading ? <span>Loading categories...</span> : (
                        <ul className={classes.filterList}>
                            {categories.map((cur, index) => (
                                <li key={index} className={cur.name === selectedCategory ? classes.activeCategory : classes.category} onClick={() => handleCategory(cur.name)}>
                                    <span>{cur.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className={classes.itemPane}>

            </div>

        </div>
    )
}

export default ItemComponent;