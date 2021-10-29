import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const RecipeInfo = ({ ingredients }) => {

  return ingredients.map(ingredient => {
    return (
      <div>
        <div className="form-check" style={{textAlign: 'left'}}>
            <input type="checkbox" className="form-check-label" for="inlineCheckbox1" />
            &nbsp; {ingredient.quantity} {ingredient.measure} {ingredient.food}
        </div>
      </div>
    );
  });
};

export default RecipeInfo;