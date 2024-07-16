import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";
import classes from "../components/LiveChat.module.css";

const Root = () => {
  //Current user
  const [user, setUser] = useState(null);
  //Livechat Modal
  const [openChat, setOpenChat] = useState(false);
  const dispatch = useDispatch();
  const data = useLoaderData();
  //Logged in State
  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUserEmail = useSelector((state) => state.auth.userEmail);
  //Save loaded data to localStorage to enhance performance
  localStorage.setItem("productArray", JSON.stringify(data));

  useEffect(() => {
    //Update Redux store with data loaded
    dispatch({ type: "UPDATE_SHOP", data: data });
    if (userLoggedIn) {
      //Get Name to show on NAVBAR
      const userArrLocalStorage = JSON.parse(localStorage.getItem("userArr"));
      const [currentUser] = userArrLocalStorage?.filter(
        (user) => user.email === currentUserEmail
      );
      setUser(currentUser);
    }
  }, [userLoggedIn, currentUserEmail, data, dispatch]);
  return (
    <>
      <NavBar currentUser={user} />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* // key=Math.random() => Animation every render */}
      <div key={Math.random()} className={classes.livechatContainer}>
        <LiveChat isOpen={openChat} onClose={() => setOpenChat(false)} />
      </div>
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "50%",
            padding: 17,
            paddingBottom: 12,
            cursor: "pointer",
          }}
          onClick={() => setOpenChat((prevState) => !prevState)}
        >
          <FontAwesomeIcon size="2x" icon={faMessage} />
        </div>
      </div>
    </>
  );
};

export default Root;
