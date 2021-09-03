import React, { useState } from "react";
import Modal from "./Modal";
import classes from "./Recipe.module.css";

const Recipe = (props) => {
  const [open, setOpen] = useState(false);

  const errorHandler = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <Modal data={props.data} onConfirm={errorHandler} />}
      <div className={classes.container}>
        <h1>{props.title}</h1>
        <p>by:</p>
        <h2>{props.source}</h2>

        <button onClick={setOpen}>See Ingredients</button>
        <p>{props.calories.toFixed(0)} Calories</p>
        <img src={props.image} alt="" />
      </div>
    </>
  );
};

export default Recipe;
