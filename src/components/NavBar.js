import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom/dist";
import classes from "./NavBar.module.css";

const NavBar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("/");
  //Check to show customized NAV
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  //LOG OUT
  const logoutHandler = () => {
    dispatch({ type: "ON_LOGOUT" });
    navigate("/");
  };
  const navLinkStyle = {
    textDecoration: "none",
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
              to={"/checkout"}
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
            <NavLink className={classes.logout}>
              <span onClick={logoutHandler}>(Logout)</span>
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};
export default NavBar;
