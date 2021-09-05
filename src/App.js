import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Recipe from "./components/Recipe";

function App() {
  //This app uses the pubnlic API fom https://www.edamam.com/
  //In order to use this app you will need a APP ID and An APP KEY
  const APP_ID = "";
  const APP_KEY = "";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    console.log(data);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />

        <Button type="submit">Search</Button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            source={recipe.recipe.source}
            data={recipe.recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
