import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayList from "./GroceryListDisplay";

// Get items made by the current user
const GroceryList = (props) => {
    console.log(props)
    const [Items, setItems] = useState([]);
    
    const fetchItems = () => {
        fetch('http://localhost:4000/grocerylist/mylist', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(response => response.json())
        .then(json => setItems(json))
        .catch(err => console.log(err))
    } 
    console.log(Items)
    
    useEffect(() => {
        fetchItems();
    }, [])
    
    return(
        <div style={{height:"450px",overflowY:"auto"}}>
            <DisplayList Items={Items} token={props.token}/>
        </div>
    )
};

export default GroceryList;
