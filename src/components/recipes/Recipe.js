import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Modal, Form, Image, CardGroup } from "react-bootstrap";
import "./recipe.css";
import bookmark from "./bookmark-4.png";
import share from "./share-2.png";
import recipe from "./link-3.png";
import APIURL from "../../helpers/environment";

const Recipe = (props) => {
  const { label, image, url, totalTime, calories, ingredientLines } =
    props.recipe;
  const caloriesRounded = calories.toFixed(0);
  const [Item, setItem] = useState([]);
  console.log("THIS", props);

  const handleSubmit = (event) => {
    event.preventDefault();
    var AddItem = event.target.value;
    console.log(AddItem);
    console.log(props.token);

    fetch(`${APIURL}/grocerylist/create`, {
      method: "POST",
      body: JSON.stringify({ grocerylist: { item: AddItem } }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((Item) => {
        setItem(Item);
      });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Card
        style={{
          border: "none",
          boxShadow: "2px 5px 5px #000000",
          height: "500px",
          width: "300px",
        }}
      >
        <Card.Img src={image} alt={label} className="card-img-top" />
        <Card.Body className="card-body">
          <h5 className="cardTITLE">{label}</h5>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white", border: "none" }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bolder" }}
          >
            <Image
              className="recipe-icon"
              src={bookmark}
              style={{ height: "35px", padding: "5px" }}
            />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontWeight: "bolder" }}
          >
            <Image
              className="recipe-icon"
              src={share}
              style={{ height: "35px", padding: "5px" }}
            />
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "10px" }}
          >
            <Image
              className="recipe-icon"
              src={recipe}
              style={{ height: "35px", padding: "5px" }}
            />
          </a>
        </Card.Footer>
        <Card.Footer style={{ backgroundColor: "white", border: "none" }}>
          <Button
            onClick={handleShow}
            variant="custom"
            style={{ color: "whitesmoke" }}
          >
            View Ingredients
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{label}</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true" style={{}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>INGREDIENTS</h6>
            <h6 style={{ textAlign: "right" }}>
              Cooking Time: {totalTime} min &nbsp;&nbsp;||&nbsp;&nbsp; Calories:{" "}
              {caloriesRounded}
            </h6>
          </div>
          <Form onSubmit={handleSubmit} style={{}}>
            {ingredientLines.map((item) => (
              <div>
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  value={item}
                  onClick={handleSubmit}
                />
                <label htmlFor={item}>&nbsp;&nbsp;{item}</label>
              </div>
            ))}
          </Form>
          <Button
            type="submit"
            style={{
              backgroundColor: "#0075A2",
              border: "none",
              marginTop: "1em",
            }}
          >
            Add to Grocery List
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Recipe;

/*
{showIngredients ? . . . 
^ Code for viewing ingredients. On SHOW, show each ingredient & show ADD button; but don't know how to hide the Ingredients again
*/
