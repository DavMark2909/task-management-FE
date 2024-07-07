import classes from "./css/Comments.module.css";

function CommentListElement({comment}){

    return (
        <div className={classes.comment}>
            <span className={classes.issuer}>{comment.issuer}</span>
            <span className={classes.content}>{comment.content}</span>
        </div>
    );
}

export default CommentListElement;