import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";

import LiveChat from "../components/LiveChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Root = () => {
  const [user, setUser] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  const userLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUserEmail = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch();

  const data = useLoaderData();
  //
  localStorage.setItem(
    "productArray",
    JSON.stringify(
      data.map(({ _id, ...rest }) => ({
        id: _id.$oid,
        ...rest,
      }))
    )
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("productArray"));
    dispatch({ type: "UPDATE_SHOP", data: storedData });
    if (userLoggedIn) {
      const userArrLocalStorage = JSON.parse(localStorage.getItem("userArr"));
      const [currentUser] = userArrLocalStorage?.filter(
        (user) => user.email === currentUserEmail
      );
      setUser(currentUser);
    }
  }, [userLoggedIn, currentUserEmail]);
  //

  return (
    <>
      <NavBar currentUser={user} />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* HEHEHHHHHHHHHHH */}
      <LiveChat isOpen={openChat} onClose={() => setOpenChat(false)} />
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "50%",
            padding: 20,
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faMessage}
            onClick={() => setOpenChat((prevState) => !prevState)}
          />
        </div>
      </div>
    </>
  );
};

export default Root;
