import classes from "./css/Home.module.css";

function HomeElement({name, picture, method}){
    
    return (
        <div className={classes.element} onClick={method}>
            <img src={picture} alt={name} className={classes.image}/>
            <p className={classes.text}>{name}</p>
        </div>
    );
}

export default HomeElement;