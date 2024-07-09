import CommentListElement from "./CommentListElement";
import classes from "./css/Comments.module.css";
import { useState, useRef } from "react";
import plusPicture from "./pictures/plusSign.png";
import AutoResizingTextarea from "./AutoResizingTextArea";
import { useNavigate } from "react-router-dom";

function CommentSection({comments, id}){

//   const dummy = [
//     {"content": "This is the first comment just to demonstrate how it looks like. Sojme ejwhgbfvwq cqvwehgjdcvhqjwbvdschjbquhwbcdhuqbwhcudbquwbdchubqwdbcuqbwcugbqwhdbcbdcv bdchjbqdchbb1ed", "issuer": "Mark2909"},
//     {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"},
//     {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"},
//     {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"}
//   ]

    // const [comments, setComments] = useState(object);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const navigate = useNavigate();


    const commentRef = useRef(null);

    async function handleButton(){
        if (commentRef.current){
            const data = commentRef.current.getValue();
            try{
                const token = localStorage.getItem('access_token');
                const headers = new Headers();
                headers.set("Content-Type", "application/json");
                headers.set("Authorization", `Bearer ${token}`);
                const url = `http://localhost:8080/api/task/add-comment?id=${id}`;
                const comment = Array.isArray(data) ? data.join('') : data;
                const body = JSON.stringify({ "comment": comment });

                const res = await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers,
                    body
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                commentRef.current.reset();
            } catch (err) {
                setError(err.message);
            } 
        }
    }

    function cancelHandler(){
        navigate('..');
    }

    function handleAddComment(){
        setAddComment(true);
    }

    return (
        <div className={classes.main}>
            <label>Existing comments</label>
            {loading ? <p style={{textAlign: "center"}}>Loading....</p> : (
                <div className={classes.comments}>
                {comments.length !==0 ? (
                  <ul className={classes.list}>
                    {comments.map((cur, index) => (
                        <li key={index} className={classes.comment} >
                            <CommentListElement comment={cur} />
                        </li>
                    ))} 
                </ul>) : (<span>No comments yet</span>)
                }
            </div>
            )}
            <div className={classes.seperator}></div>
            <div className={classes.addcomment} onClick={handleAddComment}>
                <span>Add a new comment</span>
                <img src={plusPicture} alt="+" onClick={handleAddComment}/>
            </div>
            {addComment && (
                    <div className={classes.textarea}>
                        <AutoResizingTextarea ref={commentRef}/>
                        <button onClick={handleButton}>Add comment</button>
                    </div>
            )}
            <div className={classes.backBtn}>
                <button onClick={cancelHandler} >Back</button>
            </div>
        </div>
    )

}

export default CommentSection;