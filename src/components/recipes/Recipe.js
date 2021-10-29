import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Col, Form } from 'react-bootstrap';


const Recipe = ({ recipe }) => {

    const [showIngredients, setShowIngredients] = useState(false);
    const onClick = () => setShowIngredients(true)

    const { label, image, url, totalTime, calories, ingredients } = recipe.recipe;

    const caloriesRounded = calories.toFixed(0);
    
    const Ingredients = ({ ingredients}) => {
        return ingredients.map(ingredient => {
            return (
              <div>
                <div className="form-check" style={{textAlign: 'left'}}>
                    <input type="checkbox" className="form-check-label" htmlFor="inlineCheckbox1" />
                    &nbsp; {ingredient.text}
                </div>
              </div>
            );
          });
    };

  
    return (
      <Col>
            <Card>
                <Card.Img src={image} alt={label} className="card-img-top"/>
                <Card.Body className="card-body">
                    <Card.Title>{label}</Card.Title>
                    <Card.Text>Cooking Time: {totalTime}min <br/>Calories: {caloriesRounded}</Card.Text>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                    Go to recipe
                    </a><br/><br/>
                    
                    <Button onClick={onClick}>View Ingredients</Button>
                    <br/><br/>
                    {showIngredients ? 
                        <Form onSubmit="handleSubmit">
                            <Ingredients ingredients={ingredients} /> 
                            <Button type="submit">Add</Button>
                        </Form>
                        : null}
                    
                </Card.Body>
            </Card>
        </Col>
  );
};


export default Recipe;

/*
{showIngredients ? . . . 
^ Code for viewing ingredients. On SHOW, show each ingredient & show ADD button; but don't know how to hide the Ingredients again



*/
