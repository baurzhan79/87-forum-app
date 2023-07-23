import React from "react";
import Item from "./Item/Item";

const ItemsList = props => {
    return (
        <div style={{ margin: "0 10px" }}>
            {
                props.itemsList.map((item, index) => {
                    return (<Item
                        key={index}
                        item={item}
                        onOpenClick={() => props.onOpenItem(item)}
                    />);
                })
            }
        </div>
    );
}

export default ItemsList