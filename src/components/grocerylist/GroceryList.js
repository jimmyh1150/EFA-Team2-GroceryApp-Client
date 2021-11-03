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
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM1NzkxNTE0LCJleHAiOjE2MzU4Nzc5MTR9.ZpavJr1kkXpkv-jKwAOs9Flp9J7A56aTsNgtr-5o8Q0'
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
            <DisplayList Items={Items} />
        </div>
    )
    
};


//update items on list  
//const GroceryList = (props) => {
    //console.log(props)
    //const [Items, setItems] = useState([]);
    
    //const fetchItems = () => {
        //fetch('http://localhost:4000/grocerylist/mylist', {
            //method: 'PUT',
           // headers: new Headers ({
                //'Content-Type': 'application/json',
                //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM1NzkxNTE0LCJleHAiOjE2MzU4Nzc5MTR9.ZpavJr1kkXpkv-jKwAOs9Flp9J7A56aTsNgtr-5o8Q0'
            //})
        //})
        //.then(response => response.json())
        //.then(json => setItems(json))
       // .catch(err => console.log(err))
   // } 
    //console.log(Items)
    

    //useEffect(() => {
       // fetchItems();
    //}, [])
    
    //return(
       // <div style={{height:"450px",overflowY:"auto"}}>
           // <DisplayList Items={Items} />
       // </div>
   // )
    


  
          

export default GroceryList;