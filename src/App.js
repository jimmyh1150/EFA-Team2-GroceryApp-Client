import './App.css';
import React, {useState, useEffect, useRef} from "react";
import Recipe from './components/recipes/Recipe.jsx';
import { Row, Col } from 'react-bootstrap';
import UserSignUp from './components/auth/Login';
import Auth from './components/auth/Login';


function App() {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch]= useState('');
    const [query, setQuery] = useState('');
    const [pagination, setPagination] = useState(0);

    const prevSearchIdRef = useRef();
    useEffect(()=>{
      prevSearchIdRef.current = query;
    });
    const prevSearch = prevSearchIdRef.current

    let currentPagination = pagination;

    const fetchRecipes = async () => {
      
    if(prevSearch !== query){
      currentPagination = 0;
      setPagination(0);
    }

    

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=8f7859bc&app_key=f7c43e28aea5bc242e86fe0f089dda3c&from${currentPagination}&to=${pagination + 5}`)
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
    <div className="App">
      <div className="Nav">NAV BAR COMPONENT HERE</div>
      <div className="LoginSect">LOGIN BUTTON HERE
      <Auth/>
      
      </div>
      <div className="search-container">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" placeholder="Search recipes" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>

      <br/>
      <h2>Your search results for "{query}"</h2>
      
      <div className="recipeList">
        {recipes?.length ? ( 
            <Row>
                {recipes !== [] && recipes.map((recipe, index) => <Col><Recipe  recipe={recipe.recipe} key={index} /></Col>)}
            </Row>
            ):(
              <div>No recipes found. Please try another search.</div>
            )
        }
      </div>
        <div>
          <button onClick={prevClick}>Prev</button>
          <button onClick={nextClick}>Next</button>
        </div>
    </div>
  );
}

export default App;