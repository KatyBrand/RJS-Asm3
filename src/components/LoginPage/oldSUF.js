import React from "react";
import classes from "./Login.module.css";
import { useRef, useState } from "react";
import { checkEmail } from "../../utils/checkEmail";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isTouched, setIsTouched] = useState(false);
  // const [isExist, setIsExist] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  console.log("render", userData);
  console.log(nameRef.current?.value.trim().length);

  //Check Storage for registered Users

  const submitHandler = (e) => {
    e.preventDefault();
    const userArrLocalStorage = JSON.parse(localStorage.getItem("userArr"));
    setIsTouched(true);

    if (
      nameRef.current.value.length === 0 ||
      emailRef.current.value.length === 0 ||
      passwordRef.current.value.length <= 8 ||
      phoneRef.current.value.length === 0
    ) {
      alert("Please fill out the form below following the instructions.");
      return;
    } else {
      setUserData({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
      });
      // console.log("same email", hasSameEmail);
      // if (hasSameEmail) {
      //   setIsExist(true);
      //   return;
      // }
    }

    const hasSameEmail = checkEmail(userData.email);
    if (!hasSameEmail && !userArrLocalStorage) {
      console.log("Save a new user arr");
      const userArr = [];
      userArr.push(userData);
      localStorage.setItem("userArr", JSON.stringify(userArr));
    }
    if (!hasSameEmail && userArrLocalStorage?.length > 0) {
      console.log("update userArr", userArrLocalStorage);
      userArrLocalStorage.push(userData);
      localStorage.setItem("userArr", JSON.stringify(userArrLocalStorage));
    }
  };

  return (
    <>
      <form className={classes.form}>
        <div className={classes.title}>Sign Up</div>
        {/* {isExist && <p>An account with this email already exists.</p>} */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          autoFocus
          ref={nameRef}
          required
        />
        {/* {!userData.name && isTouched && <p>Please enter your name!</p>} */}
        {nameRef.current?.value.trim().length === 0 && isTouched && (
          <p>Please enter your name!</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
        {(emailRef.current?.value.trim().length === 0 ||
          !emailRef.current?.value.trim().includes("@")) &&
          isTouched && <p>Please enter a valid email!</p>}
        {userData.email && !checkEmail(userData?.email) && (
          <p>An account with this email already exists.</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        {passwordRef.current?.value.trim().length <= 8 && isTouched && (
          <p>Password must be at least 8 characters long.</p>
        )}
        {/* {userData.password?.length < 8 && isTouched && (
          <p>Password must be at least 8 characters long.</p>
        )} */}
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          ref={phoneRef}
          required
        />
        <button onClick={submitHandler}>Submit</button>
        {/* <Button method="login">SIGN UP</Button> */}
        <div style={{ fontSize: "18px" }}>
          Log in? <a href="#">Click</a>
        </div>
      </form>
    </>
  );
};
// export default SignUpForm;
