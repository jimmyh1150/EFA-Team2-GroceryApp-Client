import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import NavbarNav from "./components/navbar/Navbar";
import Auth from "./components/auth/Login";
import RecipeSearch from "./components/recipesearch/RecipeSearch";
import { AUTH_TOKEN_KEY } from "./constants";

function App() {
  const [sessionToken, setSessionToken] = useState(
    localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const isAuthenticated = true; // !!sessionToken;

  const updateToken = (newToken) => {
    if (!newToken) {
      return;
    }
    localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setSessionToken(undefined);
  };

  const protectedViews = () => {
    return isAuthenticated ? (
      <RecipeSearch token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div className="App">
      <NavbarNav onLogout={clearToken} isAuthenticated={isAuthenticated} />
      {protectedViews()}
      <div className="footer">FOOTER HERE</div>
    </div>
  );
}

export default App;
