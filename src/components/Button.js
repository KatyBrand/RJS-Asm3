import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addItemQuantityCart } from "../store/cart/cartAction";

const Button = (props) => {
  const { method, disabled, product, quantity } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (method) => {
    if (method === "browse") {
      return navigate("/shop");
    }
    if (method === "ADD_ITEM_CART") {
      const newData = { ...product };
      delete newData.page;
      dispatch(addToCart(newData));
    }
    if (method === "ADD_ITEM_QUAN") {
      dispatch(addItemQuantityCart(product, quantity));
    }
  };
  return (
    <>
      <button disabled={disabled} onClick={() => handleClick(method)}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
