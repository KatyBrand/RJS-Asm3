// reducers.js
import { ON_LOGIN, ON_LOGOUT } from "./loginActions";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  userEmail: JSON.parse(localStorage.getItem("userEmail")),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      // Update local storage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", JSON.stringify(action.userEmail));
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.userEmail,
      };
    case ON_LOGOUT:
      // Update local storage
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("userEmail");
      return {
        ...state,
        isLoggedIn: false,
        userEmail: "",
      };
    default:
      return state;
  }
};

export default authReducer;
