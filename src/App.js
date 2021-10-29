import React, {useEffect, useState} from 'react';
import './App.css';
import RecipesReturned from './components/recipes/Recipes';

const App = () => {

  // const APP_ID = process.env.APP_ID;
  // const API_KEY = process.env.API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState('');
  const [query, setQuery] = useState('pho');

useEffect(() => {
  GetRecipes();
}, [query]);

const GetRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=8f7859bc&app_key=f7c43e28aea5bc242e86fe0f089dda3c`);
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

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe =>(
        <RecipesReturned 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        image={recipe.recipe.image}/>
      ))};
    </div>
  );
};

export default App;
