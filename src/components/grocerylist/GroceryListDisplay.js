import React, {useState} from 'react';

const DisplayList = (props) => 
    const [Items, setItems] = useState([])
    
    const deleteItem = (Item) => {
        console.log("ItemID:",Item.id)
        console.log("ItemName:",Item)

        const id = Item.id
        
        fetch(`http://localhost:4000/grocerylist/${id}`, { 
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(data => {setItems(data)})
        .catch(err => {console.log(err)});
    }

    return (
        <ol style={{textAlign:"left"}}>
            { props.Items.map((Item) => 
                <div style={{alignItems:"left"}}>
                <li htmlFor={Item.item}>
                    <button>-</button> {Item.item}
                </li>
                </div>
            )}
        </ol>
    )
}

export default DisplayList;

/*
- From GroceryList.js, Items array is passed in
- Items array is mapped and is used to get to each "item" array
- "item" array is displayed as a numbered list.
- Line 25: in Items array, set Item array to a loop and display in a numbered list
- Line 28: on click, run delete item while passing in Item
- Use Item to get to "id", which is used in the fetch then deleted in the databas
*/
