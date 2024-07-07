import { useNavigate } from "react-router-dom";
import classes from "./css/MainHeader.module.css";
import homePicture from "./pictures/home.png";

function MainHeader({name, lastname}){

    const navigate = useNavigate();

    function openHome(){
        navigate("/home");
    }

    return (
        <header className={classes.header}>
            <div >
                <button className={classes.left}>
                    <div className={classes.image}>
                        <img src={homePicture} alt="Home" onClick={openHome}/>
                    </div>
                </button>
            </div>
            <div className={classes.center}>
                <h2>Application</h2>
            </div>
            <div className={classes.right}>
                <h1>{`${name} ${lastname}`}</h1>
                <button className={classes.profile}>Click me</button>
            </div>
            
        </header>
    );

}

export default MainHeader;