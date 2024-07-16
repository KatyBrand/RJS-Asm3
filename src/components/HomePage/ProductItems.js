import React from "react";
import classes from "./Banner.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItems = (props) => {
  const { prod, page } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Convert id mongoDB object to string to use as Params
  const newID = prod._id["$oid"];
  //Convert price to 100.000 form
  const priceNum = Number(prod.price).toLocaleString("id-ID");

  //Dispatch Action SHOW_POPUP
  const clickHandler = (prod) => {
    //HOMEPAGE - SHOW POPUP
    if (page === "home") {
      dispatch({ type: "SHOW_POPUP", payload: prod });
    } else if (page === "category") {
      //SHOP-PAGE - Navgigate
      navigate(`/detail/${newID}`);
    }
  };

  return (
    <div>
      <img
        src={prod.img1}
        alt="product"
        onClick={() => clickHandler(props.prod)}
      />
      <h4>{prod.name}</h4>
      <div className={classes.price}>{priceNum} VND</div>
    </div>
  );
};

export default React.memo(ProductItems);
