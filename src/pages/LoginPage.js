import React from "react";
import classes from "../components/LoginPage/Login.module.css";
import SignUpForm from "../components/LoginPage/SignUpForm";
import SignInForm from "../components/LoginPage/SignInForm";
import { useState } from "react";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
      <div className={classes.loginContainer}>
        {isSignUp && (
          <SignUpForm
            onSwitchMode={() => {
              setIsSignUp(false);
            }}
          />
        )}
        {!isSignUp && (
          <SignInForm
            onSwitchMode={() => {
              setIsSignUp(true);
            }}
          />
        )}
      </div>
    </>
  );
};
export default LoginPage;
