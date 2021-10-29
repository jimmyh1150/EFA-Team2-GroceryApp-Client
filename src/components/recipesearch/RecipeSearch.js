import React from "react";


const RecipeSearch = props => {
    const {search, onInputChange}= props;

    return (
       <div classname="jumbotron py-5" style="{{backgroundColor:&quot;#969696;&quot;}}">  
          <h4 classname="display-4">
          <span classname="material-icons brand-icon">fastfood</span> Food Recipe</h4>
          
            <div class="input-group mb-3  w-50 mx-auto">
              <input type="text" class="form-control" placeholder="Search Recipe" value="{search}" onchange="{onInputChange}"/>
              <button class="btn btn-light">Search Recipe</button>
            </div>
        </div>
    );
};

export default RecipeSearch;