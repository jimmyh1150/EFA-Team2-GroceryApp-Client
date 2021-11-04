import './Recipes.css';
import React, {useState, useEffect, useRef, useMemo} from "react";
import Recipe from '../recipes/Recipe.js';
import GroceryList from '../grocerylist/GroceryList';
import ListIcon from '../assets/list-2.png';
import {Button} from 'react-bootstrap';

const RecipeSearch = (props) => {
  console.log(props)
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState('');
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState(0);
  const requestMetaRef = useRef({});

  useEffect(() => {
    fetchRecipes();
  }, [query, pagination]);

  const recipeLimit = 4;
  const fetchRecipes = async () => {
    let from = pagination * recipeLimit;
    if (requestMetaRef.current.query !== query && pagination > 0) {
      from = 0;
      setPagination(0);
    }

  const to = from + recipeLimit;

  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=8f7859bc&app_key=f7c43e28aea5bc242e86fe0f089dda3c&from${from}&to=${to}`
  );
  const data = await response.json();
    requestMetaRef.current = {
      from,
      to,
      query: data.q,
      count: data.count,
      more: data.more,
    };
    setRecipes(data.hits || []);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const prevClick = () => {
    if (pagination === 0) {
      return;
    }
    setPagination(pagination - 1);
  };

  const nextClick = () => {
    if (requestMetaRef.current.more) {
      setPagination(pagination + 1);
    }
  };
  const handleNavigateLastPage = () => {
    if (!requestMetaRef.current.count) {
      return
    }
    const totalPages = Math.floor(requestMetaRef.current.count / recipeLimit) - 1 // -1 so we dont start the request at the max value. we want the last page
    setPagination(totalPages)
  }

  const paginatedRecipes = useMemo(() => {
    if (recipes.length > 0 && recipes.length === requestMetaRef.current.to) {
      return recipes.slice(
        requestMetaRef.current.from,
        requestMetaRef.current.to
      );
    }
    return recipes;
  }, [recipes]);
  
  const [visible, setVisible] = useState(false);

    return (
      <div>
        <div className="search-container">
          <form onSubmit={handleFormSubmit} className="search-form">
            <input 
              className="search-bar" 
              type="text" 
              placeholder="Search recipes" 
              value={search} 
              onChange={updateSearch} 
            />
            <button className="searchBTN" type="submit">
              
            </button>
          </form>
        </div>
        <br/>      
        <div className="recipeList" style={{alignItems:"center"}}>
          {paginatedRecipes?.length >0 && (
              
              <div token={props.token} style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
              {paginatedRecipes.map((recipe, index) => (
                    <Recipe recipe={recipe.recipe} key={index} token={props.token} />
              ))}
              </div>
         
        )}
        {paginatedRecipes.length === 0 && !!query && (
          <div>No recipes found. Please try another search.</div>
        )}
        <div>
        {paginatedRecipes?.length > 0 && ( <div>
          {/* <button onClick={() => setPagination(0)}>{'<<<'}</button> */}
          <Button onClick={prevClick} style={{marginBottom:"30px",backgroundColor:"#0075A2",border:"none"}}>Prev</Button>
          
          <Button onClick={nextClick}style={{backgroundColor:"#0075A2",border:"none"}}>Next</Button>
          {/* <button onClick={handleNavigateLastPage}>{'>>>'}</button> */}
          </div>
        )}
        </div>
        <div style={{position:"fixed",bottom:"30px",right:"35px"}}>
            {visible && 
              <div style={{backgroundColor:"#EFF8E2",position:"absolute",bottom:"70px",right:"0",
                  borderRadius:"15px",height:"500px",transition:"all 5.5s ease-in-out",width:"400px",boxShadow:"2px 25px 25px #000000"}}>
                  <h5 style={{marginTop:"10px"}}>My Grocery List</h5>
                  <hr style={{width:"50%",margin:"auto",marginTop:"10px",marginBottom:"10px"}}/>
                  <p><i>Click the button to delete it from the list</i></p>
                  <GroceryList token={props.token}/>
              </div>}
            <button onClick={() => setVisible(!visible)} className="listBTN">
              <img src={ListIcon} className="ListIcon" alt="list"/></button>
        </div>
      </div>
      <br/>
      <br/>
      </div>
      
    );
};

export default RecipeSearch;