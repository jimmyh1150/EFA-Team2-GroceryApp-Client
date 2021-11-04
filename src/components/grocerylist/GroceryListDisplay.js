import React, { useState } from "react";
import APIURL from "../../helpers/environment";

const DisplayList = (props) => {
  const [Items, setItems] = useState([]);

  const deleteItem = (Item) => {
    console.log("ItemID:", Item.id);
    console.log("ItemName:", Item);

    const id = Item.id;

    fetch(`${APIURL}/grocerylist/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ol style={{ textAlign: "left" }}>
        {props.Items.map((Item) => (
          <div style={{ alignItems: "left" }}>
            <li htmlFor={Item.item} style={{ padding: "1px" }}>
              <button
                onClick={() => deleteItem(Item)}
                style={{
                  borderRadius: "5px",
                  background: "#0075A2",
                  border: "none",
                  fontWeight: "bolder",
                  color: "whitesmoke",
                }}
              >
                -
              </button>{" "}
              {Item.item}
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default DisplayList;

/*
- From GroceryList.js, Items array is passed in
- Items array is mapped and is used to get to each "item" array
- "item" array is displayed as a numbered list.
- Line 25: in Items array, set Item array to a loop and display in a numbered list
- Line 28: on click, run delete item while passing in Item
- Use Item to get to "id", which is used in the fetch then deleted in the database
*/
