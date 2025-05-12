import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Recipe from "./components/Recipe";
import classes from "./App.module.css";
import Modal from "./components/Modal";

function App() {
  //This app uses the pubnlic API fom https://www.edamam.com/
  //In order to use this app you will need a APP ID and An APP KEY
  // const APP_ID = "00d0a23d";
  // const APP_KEY = "fbe95899ecbd4127523f1e55c6571f99";

  let APP_ID = process.env.REACT_APP_API_ID;
  let APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [isValid, setIsValid] = useState(true);

  const [open, setOpen] = useState(true);
  const [btnState, setBtnState] = useState("general");

  const foodInputRef = useRef();

  useEffect(() => {
    const getRecipes = async () => {

      const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

      try {
        const response = await fetch(apiUrl);

        const data = await response.json();
        setRecipes(data.hits);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setRecipes([]);
      }
    };
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    if (e.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    const enteredFood = foodInputRef.current.value;
    if (enteredFood.trim().length === 0) {
      setIsValid(false);
      return;
    }
    setQuery(search);
    setSearch("");
  };

  const modalHandler = () => {
    setOpen(false);
    setBtnState("");
  };

  return (
    <div className="App">
      {open && <Modal btnInfo={btnState} onConfirm={modalHandler} />}
      <>
        <form onSubmit={getSearch} className="search-form">
          <input
            ref={foodInputRef}
            onChange={updateSearch}
            className={` ${classes["search-bar"]} ${
              !isValid && classes.invalid
            }`}
            type="text"
            placeholder="try Pulled Pork, Pizza, Coffee..."
            value={search}
          />

          <Button className={classes.searchBtn} type="submit">
            Search
          </Button>
        </form>
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
                key={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              source={recipe.recipe.source}
              data={recipe.recipe}
            />
          ))}
        </div>
      </>
    </div>
  );
}

export default App;
