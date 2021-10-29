import './App.css';
import React, {useState, useEffect} from "react";
import Recipe from './components/recipes/Recipe';
import { Row } from 'react-bootstrap';


// const query = 'chicken';
// const app_id = '1823a3dc';
// const app_key = '04f5246a78c24cc42e21758d51bbb1e7';

const recipeCards = {
   width: '130px'
}


function App() {

    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=1823a3dc&app_key=04f5246a78c24cc42e21758d51bbb1e7&from0&to=10`)
        const data = await response.json();
        setRecipes(data.hits);
    }

    useEffect(() => {
      fetchRecipes();
    }, [])   
  
  return (
    <div className="App results-container" style={{width: '90%', margin: 'auto'}}>
      <h2>Your search results:</h2>
      <div className={recipeCards}>
        <Row xs={1} md={5} className="g-4">
            {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} />)}
        </Row>
      </div>
    </div>
  );
}

export default App;