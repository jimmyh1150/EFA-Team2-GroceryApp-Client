import "./App.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Recipe from "./components/recipes/Recipe.jsx";
import { Row, Col } from "react-bootstrap";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState(0);
  const requestMetaRef = useRef({});
  // const prevSearchIdRef = useRef();
  // useEffect(() => {
  //   prevSearchIdRef.current = search;
  // }, [search]);
  // const currSearch = prevSearchIdRef.current;

  useEffect(() => {
    fetchRecipes();
  }, [query, pagination]);

  const recipeLimit = 8;
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

  const updateSearch = (e) => {
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

  return (
    <div className="App">
      <div className="Nav">NAV BAR COMPONENT HERE</div>

      <div className="search-container">
        <form onSubmit={handleFormSubmit} className="search-form">
          <input
            className="search-bar"
            type="text"
            placeholder="Search recipes"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>

      <br />
      {!!query && <h2>Your search results for "{query}"</h2>} 

      <div className="recipeList">
        {paginatedRecipes?.length > 0 && (
          <>
            {paginatedRecipes.map((recipe, index) => (
              <Recipe recipe={recipe.recipe} key={index} />
            ))}
          </>
        )}
        {paginatedRecipes.length === 0 && !!query && (
          <div>No recipes found. Please try another search.</div>
        )}
      </div>
      {paginatedRecipes?.length > 0 && ( <div>
        {/* <button onClick={() => setPagination(0)}>{'<<<'}</button> */}
        <button onClick={prevClick}>Prev</button>
        <button onClick={nextClick}>Next</button>
        {/* <button onClick={handleNavigateLastPage}>{'>>>'}</button> */}
      </div>)}
    </div>
  );
}

export default App;
