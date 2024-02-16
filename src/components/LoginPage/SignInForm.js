import React, { useState } from "react";
import classes from "./Login.module.css";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignInForm({ onSwitchMode }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState(false);
  const [isAccValid, setIsAccValid] = useState(false);
  const [hideWarn, setHideWarn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Save input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setHideWarn(false);
  };
  //Get UserArr
  const userArrLocalStorage = JSON.parse(localStorage.getItem("userArr"));
  // Check valid input to enable submit button

  let isValid = true;
  const { email, password } = formData;
  if (isTouched) {
    isValid = email.trim().includes("@") && password.trim().length > 8;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);
    if (!userArrLocalStorage) {
      alert("No users registered yet! Please SIGN UP first!");
      return;
    }
    const userFound = userArrLocalStorage.filter(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (email.trim().includes("@") && password.trim().length > 8) {
      if (userFound.length === 0 && isValid) {
        setIsAccValid(false);
        setHideWarn(true);
        setFormData({
          email: formData.email,
          password: "",
        });
      } else {
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "ON_LOGIN", userEmail: formData.email });
        navigate("/");
      }
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.title}>Sign In</div>
        {!isAccValid && isTouched && hideWarn && (
          <p>Invalid email or password. Please try again!</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoFocus
        />

        {!formData.email?.trim().includes("@") && isTouched && (
          <p>Please enter a valid email!</p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {formData.password?.trim().length <= 8 && isTouched && (
          <p>Please enter a valid password.</p>
        )}

        <Button method="login" type="submit" disabled={!isValid}>
          SIGN IN
        </Button>
        <div style={{ fontSize: "18px" }}>
          Create an account?{" "}
          <a
            onClick={() => onSwitchMode()}
            style={{ color: "blue", marginLeft: "8px", cursor: "pointer" }}
          >
            Sign up
          </a>
        </div>
      </form>
    </>
  );
}

export default SignInForm;
