import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import classes from "./Recipe.module.css";

const Recipe = (props) => {
  const [open, setOpen] = useState(false);
  const [btnState, setBtnState] = useState("");

  const modalHandler = () => {
    setOpen(false);
    setBtnState("");
  };

  const ingredientsBtnHandler = () => {
    setBtnState("ingredients");
    setOpen(true);
  };

  const detailsBtnHandler = () => {
    setBtnState("details");
    setOpen(true);
  };

  return (
    <>
      {open && (
        <Modal data={props.data} btnInfo={btnState} onConfirm={modalHandler} />
      )}
      <div className={classes.container}>
        <h1>{props.title}</h1>
        <p>by:</p>
        <h2>
          <a href={props.data.url} target="_blank" rel="noreferrer">
            {props.source}
          </a>
        </h2>
        <div className={classes.btnContainer}>
          <Button onClick={ingredientsBtnHandler} className={classes.btn}>
            See Ingredients
          </Button>
          <br />
          <Button onClick={detailsBtnHandler} className={classes.btn}>
            See Details
          </Button>
        </div>
        <br />
        <h2 className={classes.caloriesTitles}>Calories :</h2>
        <h3 className={classes.caloriesTitles}>{props.calories.toFixed(0)}</h3>
        <br />
        <img className={classes.foodImg} src={props.image} alt="" />
      </div>
    </>
  );
};

export default Recipe;
