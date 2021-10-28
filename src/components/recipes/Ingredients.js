import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const RecipeIngredients = ({ ingredients }) => {
    return ingredients.map(ingredient => {

    
    
        return (
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">{ingredient.quantity} {ingredient.measure} {ingredient.food}</label>
            </div>
        )
    })
}
export default RecipeIngredients;

