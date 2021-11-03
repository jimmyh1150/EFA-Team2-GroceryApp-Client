import './App.css';
import React, {useState, useEffect, useRef} from "react";
import NavbarNav from './components/navbar/Navbar';
import Auth from './components/auth/Login';
import RecipeSearch from './components/recipesearch/RecipeSearch';

function App() {

    const [sessionToken, setSessionToken] = useState(undefined);

    useEffect(() => {
      if(localStorage.getItem('token')){
        setSessionToken(localStorage.getItem('token'))
      }
    }, []) 

    const updateToken = (newToken) => {
      localStorage.setItem('token', newToken);
      setSessionToken(newToken);
    };

    const clearToken = () => {
      localStorage.clear();
      setSessionToken('');
    };

    const protectedViews = () => {
        return (sessionToken === localStorage.getItem('token') ? 
        <RecipeSearch token={sessionToken} /> : <Auth updateToken={updateToken}/> 
        )
    }

    return (
        <div className="App">
            <NavbarNav clearLocalStorage={clearToken}/>
            {protectedViews()}
            <div className="footer">FOOTER HERE</div>
        </div>
    );
}

export default App;

/*

*/