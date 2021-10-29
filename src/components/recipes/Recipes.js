import React from "react";


const RecipesReturned = ({title, image}) => {
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt=""/>
        </div>
    );
}

export default RecipesReturned;