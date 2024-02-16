import React from "react";
import classes from "./Banner.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItems = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, img1, name, price, page } = props;
  //Convert price to 100.000.000 form
  const priceNum = Number(price).toLocaleString("id-ID");

  //Dispatch Action SHOW_POPUP
  const clickHandler = (prod) => {
    //Prod = Product clicked
    //HOMEPAGE - SHOW POPUP
    if (page === "home") {
      dispatch({ type: "SHOW_POPUP", payload: prod });
    } else if (page === "category") {
      navigate(`/detail/${id}`);
    }
  };

  return (
    <div>
      <img src={img1} alt="product-image" onClick={() => clickHandler(props)} />
      <h4>{name}</h4>
      <div className={classes.price}>{priceNum} VND</div>
    </div>
  );
};

export default React.memo(ProductItems);
