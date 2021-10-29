import './App.css';
import React, {useState, useEffect} from "react";
import Recipe from './components/recipes/Recipe';
import { Row } from 'react-bootstrap';


const recipeCards = {
   width: '130px'
}


function App() {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch]= useState('');
    const [query, setQuery] = useState('pho');
    const [pagination, setPagination] = useState(0);
  

    const fetchRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=8f7859bc&app_key=f7c43e28aea5bc242e86fe0f089dda3c&from${pagination}&to=${pagination + 5}`)
        const data = await response.json();
        setRecipes(data.hits);
    }

    const updateSearch = e => {
      setSearch(e.target.value);
      };


    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }

    const prevClick = () => {
      if(pagination === 0){
          return;
      }
      setPagination(pagination-5);
  }

  const nextClick = () => {
      setPagination(pagination+5);
  }

    
    useEffect(() => {
      fetchRecipes();
    }, [query, pagination])   
  
  return (
    <div className="App results-container" style={{width: '90%', margin: 'auto'}}>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <br/>
      <h2>Your search results:</h2>
      <div className={recipeCards}>
        <Row xs={1} md={5} className="g-4">
            {recipes !== [] && recipes.map((recipe, index) => <Recipe  recipe={recipe} key={index} />)}
        </Row>
        
      </div>
        <div>
          <p onClick={prevClick}>Prev</p>
          <p onClick={nextClick}>Next</p>
        </div>
    </div>
  );
}

export default App;