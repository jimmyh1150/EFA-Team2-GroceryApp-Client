import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ingredients from './Ingredients';

const RecipeCard = (props) => {



    const getIngredients = () => {
        
    }

    return (
        <div className="card">
            <img className="card-img-top" src={props.recipes.recipe.image} alt="Recipe" />
            <div class="card-body">
                <h5 className="card-title">{props.recipes.recipe.label}</h5>
                <p>({props.recipes.recipe.totalTime} , {props.recipes.recipe.calories})</p>
                <a href={props.recipes.recipe.url} target="_blank" rel="noreferrer">Go to recipe</a>

                <button class="btn btn-primary" type="button" data-toggle="collapse" 
                    data-target="#ingredients" aria-expanded="false" aria-controls="ingredients">
                    View Ingredients
                </button>

                <a href={props.recipes.recipe.ingredients} className="btn btn-primary"
                    onClick={getIngredients}
                    data-toggle="collapse" data-target="#list">
                    View Ingredients</a>
            </div>
            <div class="collapse" id="list">
                <img style={{width: '20px'}} src={require('../assets/close.png')} alt="close" onClick={() => {this.disable();}} />
                <h5>Ingredients</h5>
                <div>
                    <Ingredients />
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;

/* 


*/