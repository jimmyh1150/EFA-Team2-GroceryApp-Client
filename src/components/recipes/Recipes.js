import React from "react";


const RecipesReturned = ({title, image}) => {
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt=""/>
            <p>Prev</p>
            <p>Next</p>
        </div>
    );
}

export default RecipesReturned;