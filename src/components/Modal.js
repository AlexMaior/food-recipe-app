import { Fragment } from "react";
import ReactDom from "react-dom";
import Button from "./Button";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
const ModalOverlay = (props) => {
  if (props.btnInformation === "ingredients") {
    return (
      <Fragment>
        <div className={classes.modal}>
          <h2>Ingredients for {props.data.label}:</h2>
          <ol>
            {props.data.ingredients.map((ingredient) => (
              <li key={props.data.id}>{ingredient.text}</li>
            ))}
          </ol>
          <Button onClick={props.onConfirm}>Close</Button>
        </div>
      </Fragment>
    );
  } else if (props.btnInformation === "details") {
    return (
      <Fragment>
        <div className={classes.modal}>
          <h2>Details for {props.data.label}:</h2>
          <ol>
            {props.data.digest.map((dig) => (
              <li key={props.data.id}>
                {dig.label}: {dig.total.toFixed(0)} {dig.unit}
              </li>
            ))}
          </ol>
          <Button onClick={props.onConfirm}>Close</Button>
        </div>
      </Fragment>
    );
  }
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          data={props.data}
          btnInformation={props.btnInfo}
          onConfirm={props.onConfirm}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
