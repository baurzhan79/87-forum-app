import React from "react";
import Comment from "./Comment/Comment";

const CommentsList = props => {
    return (
        <div>
            <h4 style={{ marginLeft: "10px" }}>Comments</h4>
            {
                props.commentsList.map((item, index) => {
                    return (<Comment
                        key={index}
                        item={item}
                    />);
                })
            }
        </div>
    );
}

export default CommentsList