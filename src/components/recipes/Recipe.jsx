import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';



const Recipe = (props) => {
    console.log(props)
    const { label, image, url, totalTime, calories, ingredientLines } = props.recipe;
    const caloriesRounded = calories.toFixed(0);
    const [Item, setItem] = useState([]);
    const [Ingredient, setIngredient] = useState('')

  

    const handleSubmit = (event) => {
      event.preventDefault();
      var AddItem = event.target.value;
      console.log(AddItem);

      fetch('http://localhost:3000/grocerylist/create', {
          method: 'POST',
          body: JSON.stringify({grocerylist: {item: AddItem}}),
          headers: new Headers ({
              'Content-Type': 'application/json',
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjM1NzAzMTYwLCJleHAiOjE2MzU3ODk1NjB9.MmCGY7pMlQeFm2WEMIjxw-OzdJqX7inTndFmsgVoyFA'
          })
      }).then( (res) => res.json())
          .then((Item)=> {
              console.log(Item);
              setItem(Item);
              console.log(Item)
          })
    }
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    //const filteredItems = prevState.itesm.filter(item => {})

    return (
      <div>
              <Card>
                  <Card.Img src={image} alt={label} className="card-img-top"/>
                  <Card.Body className="card-body">
                      <Card.Title>{label}</Card.Title>
                      <Card.Text>Cooking Time: {totalTime}min <br/>Calories: {caloriesRounded}</Card.Text>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                      Go to recipe
                      </a><br/><br/>
                      
                      <Button onClick={handleShow}>View Ingredients</Button>

                      <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>{label} <br/>Ingredients <br/> </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form onSubmit={handleSubmit}>

                            {ingredientLines.map((item) => 
                            <div>
                              <input type="checkbox" id={item} name={item} value={item} onClick={handleSubmit} />
                              <label htmlFor={item}>{item}</label>
                            </div>)}

                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose}>Close</Button>
                            <Button type="submit" >Add</Button>
                        </Modal.Footer>
                      </Modal>
                  </Card.Body>
              </Card>
      </div>  
    );
};


export default Recipe;

/*
{showIngredients ? . . . 
^ Code for viewing ingredients. On SHOW, show each ingredient & show ADD button; but don't know how to hide the Ingredients again



*/
