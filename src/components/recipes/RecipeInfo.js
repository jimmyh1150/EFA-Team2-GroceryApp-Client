import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const RecipeInfo = ({ ingredients }) => {

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

export default RecipeInfo;