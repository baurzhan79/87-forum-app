import React from "react";
import { useSelector } from "react-redux";

import "./Item.css";
import imageText from "../../../assets/images/image_text.png";
import { apiURL } from "../../../config";

const Item = props => {
    const user = useSelector(state => state.users.user);

    const datetime = new Date(props.item.datetime);

    let cardImage = imageText;
    if (props.item.image) cardImage = apiURL + "/uploads/" + props.item.image;

    return (
        <div className="Item">
            <div className="Item-box">
                <div className="Item-imgBox">
                    <img className="Item-img" src={cardImage} alt="" />
                </div>
                <div className="Item-description">
                    <p>{props.item.title}</p>
                    <div className="Item-btnBox">
                        <span className="Item-span">{datetime.toLocaleDateString()} {datetime.toLocaleTimeString()} by {props.item.authorName}</span>
                        {
                            user !== null ? <button className="Item-btn Item-btnOpen" onClick={props.onOpenClick}>Read Full Post</button> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;