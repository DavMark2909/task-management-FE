import { useEffect, useRef, useState } from "react";
import { getRequest } from "../utils/RequestHandler";
import classes from "./css/ItemComponent.module.css";
import classes1 from "./css/Items.module.css";
import searchPicture from "./pictures/search.png";
import { useNavigate } from "react-router-dom";
import SelectableOptions from "./SelectableOptions";
import defaultImg from "./pictures/default.png";

function ItemComponent({addOption}){

    const token = localStorage.getItem("access_token");
    const navigate = useNavigate()

    console.log(token);

    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [items, setItems] = useState();
    const [itemLoading, setItemLoading] = useState(false);
    const [lookingForItem, setLookingForItem] = useState();
    const [loadingLooking, setLoadingLooking] = useState(false);
    const [sortingSettings, setSortingSettings] = useState();

    const searchRef = useRef();

    const dummyFruits = [
        {name: "Banana", price: 0.59},
        {name: "Apple", price: 0.80},
        {name: "Peach", price: 1.15},
        {name: "Orange", price: 0.90},
        {name: "Lemon", price: 2.20},
    ];


    useEffect(() => {
        const fetchCategories = async () => {
            const url = "http://localhost:8080/api/item/categories";
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
            if (selectedCategory){
                const url = `http://localhost:8080/api/item/getItems/${selectedCategory}`;
                try{
                    const items = await getRequest(url, token);
                    setItems(items);
                    setItemLoading(false);
                } catch (error){
                    setItemLoading(false);
                    setError("Error laoding items");
                }
            }
        };
        fetchCategory();
    }, [selectedCategory]);


    useEffect(() => {
        const fetchLookingForItem = async () => {
            if (lookingForItem){
                const url = `http://?item=${lookingForItem}`;
                try{
                    loadingLooking(true);
                    const item = await getRequest(url, token);
                    navigate(item.name);
                } catch (error){
                    setError(`There is no such item with the name ${lookingForItem}`);
                }
            }
        };
        fetchLookingForItem();
    }, [lookingForItem]);

    useEffect(() => {
        const fetchSortedData = async () => {
            if (sortingSettings){
                const url = `http://localhost:8080/api/item/sorted?sort=${sortingSettings}`;
                try{
                    // const items = await getRequest(url, token);
                    // setItems(items);
                    setItemLoading(false);
                } catch (error){
                    setItemLoading(false);
                    setError("Error laoding items");
                }
            }
        };
        fetchSortedData();
    }, [sortingSettings]);

    function handleOption(name){
        setSortingSettings(name);
    }

    function handleCategory(name){
        setItemLoading(true);
        setSelectedCategory(name);
    }

    function lookFor(){
        //implement search engine
    }

    return (
        <div className={classes.main}>
            <div className={classes.left}>
            {error && <span>{error}</span>}
            <div className={classes.filterPane}>
                <div className={classes.filterName}>
                    <h2>Category</h2>
                </div>
                <div className={categoryLoading ? classes.filterOptionsLoad : classes.filterOptions}>
                    {categoryLoading ? <span>Loading categories...</span> : categories ? (
                        <ul className={classes.filterList}>
                            {categories.map((cur, index) => (
                                <li key={index} className={cur === selectedCategory ? classes.activeCategory : classes.category} onClick={() => handleCategory(cur)}>
                                    <span>{cur}</span>
                                </li>
                            ))}
                        </ul>
                    ) : <span>Error</span>}
                </div>
                <div className={classes.filterName}>
                    <h3>Sort by</h3>
                </div>
                <div className={classes.options}>
                    <SelectableOptions options={["Sales", "Quantity", "Popularity"]} handler={handleOption}/>
                </div>
            </div>
            <div className={classes.addNew}>
                <span>Add a new item</span>
                {/* add a plus sign here with a redirection to create a new item */}
            </div>
            </div>       




            <div className={items ? classes1.itemPane : classes1.suggest}>
                <div className={classes1.itemSearcher}>
                    <input placeholder="Search for" ref={searchRef}/>
                    <img src={searchPicture} alt="Go" className={classes1.searchBtn} onClick={lookFor} />
                </div>
                {selectedCategory ? (itemLoading ? (
                    <div className={classes1.suggestSpan}>
                        <span>Loading...</span>
                    </div>) :
                    
                    (<>
                        <div className={classes1.category}><h2>{selectedCategory}</h2></div>
                        <div className={classes1.itemGrid}>
                            <ul className={classes1.itemList}>
                                {dummyFruits.map((item, index) => (
                                    <li key={index} className={classes1.item}>
                                        <div className={classes1.itemImg}>
                                            <img src={defaultImg} alt={item.name} onLoad={(e) => e.target.style.opacity = 1}
                                                style={{ opacity: 0, transition: 'opacity 0.5s' }}/>
                                        </div>
                                        <div className={classes1.itemContent}>
                                            <span className={classes1.name}>{item.name}</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )) : 
                    <div className={classes1.suggestSpan}>
                        <span>Select the desired category</span>
                    </div>
                }
            </div>

        </div>
    )
}

export default ItemComponent;