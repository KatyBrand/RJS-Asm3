import React from "react";
import classes from "./Popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import Button from "./Button";

const Popup = (props) => {
  //Get product's info
  const { img1, name, price, longDesc } = props.product;
  const dispatch = useDispatch();

  //Dispatch Action HIDE_POPUP
  const hidePopUpHandler = () => {
    dispatch({ type: "HIDE_POPUP" });
  };
  //Convert price to 100.000.000 format
  const priceNum = Number(price).toLocaleString("id-ID");
  //Truncate func to shorten description to 700 letters
  const trunDes =
    longDesc.length > 700 ? longDesc.substring(0, 700) + "..." : longDesc;

  return (
    <>
      <div className={classes.modalOverlay} onClick={hidePopUpHandler}>
        <div className={classes.modalContent}>
          <button className={classes.closeButton}>X</button>
          <div className={classes.modalImg}>
            <img src={img1} alt="product-img" />
          </div>
          <div className={classes.modalDetail}>
            <h3>{name}</h3>
            <h5 className={classes.price}>{priceNum} VND</h5>
            <p>{trunDes}</p>
            <Button product={props.product} method="ADD_ITEM_CART">
              <span style={{ marginRight: "8px" }}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className={classes.icon}
                />
              </span>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Popup);
