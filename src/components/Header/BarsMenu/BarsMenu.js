import React, { useState } from "react";

import CSSTransition from "react-transition-group/CSSTransition";

import close from "../../../assets/images/close.png";
import arrowRight from "../../../assets/images/arrowRight.png";
import arrowLeft from "../../../assets/images/arrowLeft.png";
import arrowDown from "../../../assets/images/arrowDown.png";
import horizontalTransition from "./horizontalTransition.module.css";
import secondaryHorizontalTransition from "./secondaryHorizontalTransition.module.css";

import products, { support } from "../../../data/products";

import classes from "./BarsMenu.module.css";

function BarsMenu(props) {
  const [menuSelected, setMenuSelected] = useState("");
  const [sideMenu,setSideMenu]=useState("");
  const data = [...products, support];
  const closeClicked = () => {
    setMenuSelected("");
    props.closed();
  };
  const menuclicked = (el) => {
    setMenuSelected(el);
    setSideMenu(el)
  };
  const backClicked = () => {
    setMenuSelected("");
  };

  console.log(menuSelected);
  const productList = data.map((pd, i) => (
    <div
      className={classes.MenuType}
      key={pd.title}
      onClick={() => menuclicked(i)}
    >
      <div>{pd.title}</div>
      <img src={arrowRight} alt="X" height="12px"></img>
    </div>
  ));
  let selctedMenuList = null;
  let menuSelctedElement = null;
  if (sideMenu !== "") {
    selctedMenuList = data[sideMenu]["types"].map((pd, i) => (
      <div className={classes.MenuType} key={pd.name}>
        <div>{pd.name}</div>
        <img src={arrowDown} alt="X" height="12px"></img>
      </div>
    ));
    menuSelctedElement = (
      <div  className={classes.Menu}>
        <div className={classes.Back} onClick={backClicked}>
          <img src={arrowLeft} alt="<" height="24px"></img>
        </div>
        <div>
          <div className={classes.Title}>{data[sideMenu].title}</div>
          {selctedMenuList}
        </div>
      </div>
    );
  }

  return (
    <div
      className={classes.BarsMenu}
      style={{
        right: props.show ? "0" : "-100%",
        visibility: props.show ? "visible" : "hidden",
      }}
    >
      <div className={classes.Close}>
        <img src={close} alt="X" onClick={closeClicked}></img>
      </div>
      <CSSTransition
        in={menuSelected === ""}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={horizontalTransition}
      >
        {(state) => <div className={classes.Menu}>{productList}</div>}
      </CSSTransition>
      <CSSTransition
        in={menuSelected !== ""}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={secondaryHorizontalTransition}
      >
        {(state) => menuSelctedElement}
      </CSSTransition>

      {/* {menuSelected === null ? productList : menuSelctedElement} */}
    </div>
  );
}

export default BarsMenu;