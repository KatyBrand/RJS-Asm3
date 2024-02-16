import React, { useState } from "react";
import classes from "./Login.module.css";
import { checkEmail } from "../../utils/checkEmail";
import Button from "../Button";

function SignUpForm({ onSwitchMode }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isTouched, setIsTouched] = useState(false);
  const [accIsExist, setAccExist] = useState(false);
  //Save input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAccExist(false);
  };
  //Get UserArr
  const userArrLocalStorage = JSON.parse(localStorage.getItem("userArr"));
  // Check valid input to enable submit button
  const { fullName, email, password, phone } = formData;
  let isValid = true;
  if (isTouched) {
    isValid =
      fullName.trim().length > 0 &&
      email.trim().includes("@") &&
      password.trim().length > 8 &&
      phone.trim().length > 0;
  }

  const handleSubmit = (e) => {
    setIsTouched(true);
    e.preventDefault();
    // New variable to update the lastest data
    const isExist = checkEmail(formData.email);

    if (isExist) {
      setAccExist(true);
    } else {
      setAccExist(false);
    }
    const valid =
      formData.fullName.trim().length > 0 &&
      formData.email.trim().includes("@") &&
      formData.password.trim().length > 8 &&
      formData.phone.trim().length > 0;

    if (valid && !isExist) {
      const userArr = userArrLocalStorage ? [...userArrLocalStorage] : [];
      userArr.push(formData);
      localStorage.setItem("userArr", JSON.stringify(userArr));
      alert("Sign Up successfull!");
      onSwitchMode();
      // Reset the form after submission
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.title}>Sign Up</div>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          autoFocus
          // required
        />
        {formData.fullName.trim().length === 0 && isTouched && (
          <p>Please enter your name!</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {!formData.email.trim().includes("@") && isTouched && (
          <p>Please enter a valid email!</p>
        )}
        {accIsExist && <p>An account with this email already exists.</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {formData.password.trim().length <= 8 && isTouched && (
          <p>Password must have more than 8 characters.</p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {formData.phone.trim().length === 0 && isTouched && (
          <p>Please enter your phone!</p>
        )}

        <Button method="signup" disabled={!isValid} type="submit">
          SIGN UP
        </Button>
        <div style={{ fontSize: "18px" }}>
          Log in?
          <a
            onClick={() => onSwitchMode()}
            style={{ color: "blue", marginLeft: "8px", cursor: "pointer" }}
          >
            Click
          </a>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
