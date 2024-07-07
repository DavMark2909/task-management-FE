import CommentListElement from "./CommentListElement";
import classes from "./css/Comments.module.css";
import { useState, useEffect } from "react";

function CommentSection({id}){

  const dummy = [
    {"content": "This is the first comment just to demonstrate how it looks like. Sojme ejwhgbfvwq cqvwehgjdcvhqjwbvdschjbquhwbcdhuqbwhcudbquwbdchubqwdbcuqbwcugbqwhdbcbdcv bdchjbqdchbb1ed", "issuer": "Mark2909"},
    {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"},
    {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"},
    {"content": "Это супер коммент который предназгачен к демонстрации интерфейса", "issuer": "User2"}
  ]

    const [comments, setComments] = useState(dummy);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchComments = async () => {
    //       try {
    //         const token = localStorage.getItem('access_token');
    //         const headers = new Headers();
    //         headers.set("Content-Type", "application/json");
    //         headers.set("Authorization", `Bearer ${token}`);
    //         const url = "http://localhost:8080/api/task/comments";
    //         const body = JSON.stringify({ taskId: id });
    
    //         const response = await fetch(url, {
    //           method: "GET",
    //           mode: "cors",
    //           headers,
    //           body
    //         });
    
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    
    //         const data = await response.json();
    //         setComments(data);
    //       } catch (err) {
    //         setError(err.message);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchComments();
    //   }, [id]); 

    return (
        <div className={classes.main}>
            <label>Existing comments</label>
            {loading ? <p style={{textAlign: "center"}}>Loading....</p> : (
                <div className={classes.comments}>
                {comments.length !==0 ? (
                  <ul className={classes.list}>
                    {comments.map((cur) => (
                        <li key={cur.content} className={classes.comment} >
                            <CommentListElement comment={cur} />
                        </li>
                    ))} 
                </ul>) : (<span>No comments yet</span>)
                }
            </div>
            )}
            <div>
                <label>Add a comment</label>
                <input defaultValue="Type your comment"/>
            </div>
            
            <div>
                <span>Add a new comment</span>
                <button>Add</button>
            </div>
        </div>
    )

}

export default CommentSection;