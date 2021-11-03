import './App.css';
import React, {useState, useEffect, useRef} from "react";
import Recipe from './components/recipes/Recipe.jsx';
import { Row, Col } from 'react-bootstrap';
import GroceryList from './components/grocerylist/GroceryList';
import ListIcon from './components/assets/list-2.png';

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
    
    const [visible, setVisible] = useState(false);
    
  return (
    <div className="App">
      <div className="NavBar">NAV BAR COMPONENT HERE</div>
      <div className="search-container">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" placeholder="Search recipes" value={search} onChange={updateSearch} />
          <button className="searchBTN" type="submit"></button>
        </form>
      </div>

      <br/>
      <h2 className="searchTEXT">You searched for "{query}"</h2>
      <br/>
      <div className="results-container">
        {recipes?.length ? ( 
            <Row className="results-row">
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
      </div><br/>
      <div style={{position:"fixed",bottom:"30px",right:"35px"}}>
          {visible && 
            <div style={{backgroundColor:"#EFF8E2",position:"absolute",bottom:"70px",right:"0",borderRadius:"15px 0 0 15px",height:"500px",transition:"all 1.5s ease-in-out"}}>
                <div>My Grocery List</div>
                <GroceryList/>
            </div>}
          <button onClick={() => setVisible(!visible)} className="listBTN">
            <img src={ListIcon} className="ListIcon" alt="list"/></button>
      </div>

      
      <div className="footer">FOOTER HERE</div>

    </div>
  );
}

export default App;