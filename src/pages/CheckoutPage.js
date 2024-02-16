import React from "react";
import classes from "../components/CheckOutPage/CheckOut.module.css";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  //Get Cart data from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  //Calculate total for each item and sum up all totals
  const subTotal = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  //Submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    alert("Your order has been placed. Thank you for shopping with us!");
  };
  return (
    <>
      <div className={classes.banner}>
        <h1>CHECKOUT</h1>
        <div className={classes.subBanner}>
          <h5>HOME / </h5>
          <h5>CART / </h5>
          <h5 style={{ color: "grey" }}>CHECKOUT</h5>
        </div>
      </div>
      <h4 style={{ marginBottom: "18px" }}>BILLING DETAILS</h4>
      <div className={classes.billingContainer}>
        <div className={classes.billing}>
          <form>
            <div className={classes.formGroup}>
              <label htmlFor="fullName" className={classes.label}>
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name here!"
                className={classes.input}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="email" className={classes.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email here!"
                className={classes.input}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="phoneNumber" className={classes.label}>
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number here!"
                className={classes.input}
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="address" className={classes.label}>
                Address:
              </label>
              <input
                type="teet"
                id="address"
                placeholder="Enter your address here!"
                className={classes.input}
              />
            </div>
            <button
              type="submit"
              className={classes.submitButton}
              onClick={submitHandler}
            >
              Place Order
            </button>
          </form>
        </div>
        <di className={classes.order}>
          <h3 style={{ paddingBottom: "18px" }}>YOUR ORDER</h3>
          {cartItems.map((item) => {
            return (
              <div className={classes.container}>
                <div style={{ fontWeight: "500" }}>
                  {item.name.slice(0, 20)}
                </div>
                <div style={{ color: "grey" }}>
                  {Number(item.price).toLocaleString("id-ID")} VND x{" "}
                  {item.quantity}
                </div>
              </div>
            );
          })}
          <div
            className={classes.container}
            style={{
              border: "none",
            }}
          >
            <h5 style={{ fontWeight: "500" }}>TOTAL</h5>
            <h5 style={{ color: "grey" }}>
              {Number(subTotal).toLocaleString("id-ID")} VND
            </h5>
          </div>
        </di>
      </div>
    </>
  );
};
export default CheckoutPage;
