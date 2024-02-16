import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faL } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import classes from "./NavBar.module.css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ currentUser }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);

  const navLinkStyle = {
    textDecoration: "none",
  };

  const logoutHandler = () => {
    dispatch({ type: "ON_LOGOUT" });
    dispatch({ type: "CLEAR_CART_ON_LOG_OUT" });
  };

  return (
    <header className={classes.navbar}>
      <ul>
        <li style={{ marginRight: "12px" }}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? classes.isActive : classes.isNotActive
            }
            end
            style={navLinkStyle}
          >
            Home
          </NavLink>
        </li>
        <li style={{ marginRight: "12px" }}>
          <NavLink
            to={"/shop"}
            className={({ isActive }) =>
              isActive ? classes.isActive : classes.isNotActive
            }
            style={navLinkStyle}
            end
          >
            Shop
          </NavLink>
        </li>
        <li className={classes.brand}>BOUTIQUE</li>
        <li style={{ marginLeft: "12px" }}>
          <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              isActive ? classes.isActive : classes.isNotActive
            }
            style={navLinkStyle}
            end
          >
            Cart
          </NavLink>
        </li>
        <li style={{ marginLeft: "12px" }}>
          <FontAwesomeIcon icon={faUser} className={classes.icon} />
          {!isLoggedIn && (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? classes.isActive : classes.isNotActive
              }
              style={navLinkStyle}
              end
            >
              Login
            </NavLink>
          )}
        </li>
        {isLoggedIn && currentUser && (
          <li>
            <NavLink
              to={"/user"}
              className={({ isActive }) =>
                isActive ? classes.isActive : classes.isNotActive
              }
              style={navLinkStyle}
              end
            >
              {currentUser.fullName}

              <FontAwesomeIcon icon={faCaretDown} className={classes.icon} />
            </NavLink>
          </li>
        )}
        {isLoggedIn && currentUser && (
          <li>
            <a
              className={classes.logout}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <span onClick={logoutHandler}>(Logout)</span>
            </a>
          </li>
        )}
      </ul>
    </header>
  );
};
export default NavBar;
