import React from "react";
import "./Comment.css";

const Comment = props => {
    const datetime = new Date(props.item.datetime);

    return (
        <div className="Comment">
            <div className="Comment-description">
                <p className="Comment-title">{props.item.authorName} wrote
                    <span style={{ opacity: "0.5" }}> (at {datetime.toLocaleDateString()} {datetime.toLocaleTimeString()}) </span>
                    :</p>
                <p>{props.item.text}</p>
            </div>
        </div>
    );
};

export default Comment;