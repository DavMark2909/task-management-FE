import { useEffect, useRef, useState } from "react";
import { getRequest } from "../utils/RequestHandler";
import classes from "./css/ItemComponent.module.css";
import searchPicture from "./pictures/search.png";
import { useNavigate } from "react-router-dom";

function ItemComponent({addOption}){

    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [items, setItems] = useState();
    const [itemLoading, setItemLoading] = useState(false);
    const [lookingForItem, setLookingForItem] = useState();
    const [loadingLooking, setLoadingLooking] = useState(false);

    const searchRef = useRef();


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


    useEffect(() => {
        const fetchLookingForItem = async () => {
            const url = `http://?item=${lookingForItem}`;
            try{
                loadingLooking(true);
                const item = await getRequest(url, token);
                navigate(item.name);
            } catch (error){
                setError(`There is no such item with the name ${lookingForItem}`);
            }
        };
    }, [lookingForItem]);

    function handleCategory(name){
        setSelectedCategory(name);
    }

    function lookFor(){
        //implement search engine
    }

    return (
        <div className={classes.main}>
            {error && <span>{error}</span>}
            <div className={classes.filterPane}>
                <div className={classes.filterName}>
                    <h2>Category</h2>
                </div>
                <div className={categoryLoading ? classes.filterOptionsLoad : classes.filterOptions}>
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
            <div className={items ? classes.itemPane : classes.suggest}>
                {items ? (
                    <>
                        <div className={classes.itemsname}>{selectedCategory}</div>
                        <div className={classes.itemSearcher}>
                            <input placeholder="Search for" ref={searchRef}/>
                            <img src={searchPicture} alt="Go" className={classes.searchBtn} onClick={lookFor} />
                        </div>
                        <div className={classes.itemGrid}>

                        </div>
                    </>
                ) : <span>Select the desired category</span>}
            </div>

        </div>
    )
}

export default ItemComponent;