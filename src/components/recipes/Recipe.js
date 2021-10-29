import React, { useState } from "react";
import RecipeInfo from "./RecipeInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Col } from 'react-bootstrap';



const Recipe = ({ recipe}) => {
    const [show, setShow] = useState(false);
    const { label, image, url, ingredients, totalTime, calories } = recipe.recipe;
    const caloriesRounded = calories.toFixed(0);

    
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
                    
                    <Button onClick={() => setShow(!show)}>View Ingredients</Button>
                    {show && 
                        <div>
                            <br/>
                            <RecipeInfo ingredients={ingredients} /><br/>
                            <Button>ADD TO LIST</Button>
                        </div>
                        
                        
                    }
                </Card.Body>
            </Card>
        </Col>
  );
};

export default Recipe;