import React, { useEffect, useMemo, useState } from "react";
import classes from "../components/CartPage/CartPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faTrashCan,
  faCaretLeft,
  faCaretRight,
  faGift,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem,
  deleteFromCart,
  updateCartFromLS,
} from "../store/cart/cartAction";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Get Cart State
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(`${userEmail}`));
    if (userData && isLoggedIn) {
      dispatch(updateCartFromLS(userData.cartItems));
    }
  }, [userEmail]);

  // Calculate total for each item and sum up all totals
  const subTotal = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const handleQuantityChange = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity));
  };
  const handleRemoveItem = (itemId, productName) => {
    const productNameUC = productName.toUpperCase();
    const confirm = window.confirm(`Remove ${productNameUC} from the cart?`);
    if (confirm) {
      dispatch(deleteFromCart(itemId));
    }
  };

  return (
    <div className={classes.cart}>
      <div className={classes.banner}>
        <h1>CART</h1>
        <h5 style={{ color: "grey" }}>CART</h5>
      </div>
      <h3>Shopping cart</h3>
      <div className={classes.container}>
        <div className={classes.cartContainer}>
          <table className={classes.cartTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>
                    <img src={item.img1} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{Number(item.price).toLocaleString("id-ID")} VND</td>
                  <td>
                    <div className={classes.quantityChange}>
                      <FontAwesomeIcon
                        icon={faCaretLeft}
                        className={classes.icon}
                        onClick={() => {
                          if (item.quantity === 1) {
                            return;
                          } else
                            handleQuantityChange(item.id, item.quantity - 1);
                        }}
                      />
                      <div
                        style={{ display: "inline-block", fontStyle: "normal" }}
                      >
                        {item.quantity}
                      </div>
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className={classes.icon}
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      />
                    </div>
                  </td>
                  <td>
                    {Number(item.price * item.quantity).toLocaleString("id-ID")}{" "}
                    VND
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={classes.icon}
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classes.cartTotal}>
          <h3>Cart total</h3>
          <div
            className={classes.totalFlex}
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <h4>Subtotal</h4>
            <h6 className={classes.price}>
              {Number(subTotal).toLocaleString("id-ID")} VND
            </h6>
          </div>
          <div className={classes.totalFlex}>
            <h4>Total</h4>
            <h4 className={`${classes.price} ${classes.toTal} `}>
              {Number(subTotal).toLocaleString("id-ID")} VND
            </h4>
          </div>
          <div>
            <input type="text" placeholder="Enter Your Coupon"></input>
          </div>
          <button>
            <FontAwesomeIcon icon={faGift} className={classes.giftIcon} />
            Apply Coupon
          </button>
        </div>
        <div className={classes.cartNavi}>
          <button
            onClick={() => navigate("/shop")}
            style={{ cursor: "pointer", border: "none" }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: "8px", marginLeft: "8px", color: "black" }}
            />
            Continue Shopping
          </button>
          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "8px", color: "black" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
