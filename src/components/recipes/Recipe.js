import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form, Image } from 'react-bootstrap';
import './recipe.css';
import bookmark from './bookmark-1.png';
import share from './share-2.png';
import recipe from './link-3.png';

const Recipe = (props) => {
    console.log(props)
    const { label, image, url, totalTime, calories, ingredientLines } = props.recipe;
    const caloriesRounded = calories.toFixed(0);
    const [Item, setItem] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var AddItem = event.target.value;
        console.log(AddItem);

        fetch('http://localhost:4000/grocerylist/create', {
            method: 'POST',
            body: JSON.stringify({grocerylist: {item: AddItem}}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then( (res) => res.json())
            .then((Item)=> {
                setItem(Item);
                console.log(Item)
            })
    }
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    return (
      <>
            <Card style={{border:"none",boxShadow:"2px 5px 5px #000000"}}>
                <Card.Img src={image} alt={label} className="card-img-top"/>
                <Card.Body className="card-body">
                    <Card.Title className="cardTITLE">
                        {label}</Card.Title>
                </Card.Body>
                
                <Card.Footer style={{backgroundColor:"white", border:"none"}}>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none", fontWeight:"bolder"}}>
                            <Image className="recipe-icon" src={bookmark} style={{height:"45px", padding:"5px"}}/></a>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none", fontWeight:"bolder"}}>
                            <Image className="recipe-icon" src={share} style={{height:"45px", padding:"5px"}}/></a>
                        <a href={url} target="_blank" rel="noopener noreferrer" style={{margin:"10px"}}>
                            <Image className="recipe-icon" src={recipe} style={{height:"45px", padding:"5px"}}/></a>
                    <Card.Text>Cooking Time: {totalTime} min <br/>Calories: {caloriesRounded}</Card.Text>
                    <Button onClick={handleShow} variant="custom">View Ingredients</Button>
                    
                </Card.Footer>      
            </Card>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ingredients for "{label}"</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <Form onSubmit={handleSubmit}>
                        {ingredientLines.map((item) => 
                        <div>
                        <input type="checkbox" id={item} name={item} value={item} onClick={handleSubmit} />
                        <label htmlFor={item}>&nbsp;&nbsp;{item}</label>
                        </div>)}
                    </Form><br/>
                    <Button type="submit">Add to Grocery List</Button>
                </Modal.Body>
            </Modal>
        
      </>  
    );
};

export default Recipe;

/*
{showIngredients ? . . . 
^ Code for viewing ingredients. On SHOW, show each ingredient & show ADD button; but don't know how to hide the Ingredients again
*/
