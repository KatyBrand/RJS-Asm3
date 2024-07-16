import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./LiveChat.module.css";

const LiveChat = ({ isOpen }) => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState([]);

  const messageRef = useRef();
  const handleMessageSend = (message) => {
    if (message.current.value.trim().length === 0) {
      return;
    }
    setMessages([...messages, message.current.value]);
    messageRef.current.value = "";
    // Logic to send message to backend or messaging service
    setTimeout(() => {
      setReply(["Hello. How can I help you?"]);
    }, 800);
  };

  return (
    <>
      {isOpen && (
        <div className={classes.liveChat}>
          <div className={classes.header}>
            <h6 style={{ fontWeight: 700 }}>Customer Support</h6>
            <p>Let's Chat App</p>
          </div>
          <div style={{ height: 250 }}>
            {/* Message container */}
            <div className={classes.messageContainer}>
              {messages.map((message, index) => (
                <div key={index}>
                  <div className={classes.textBackground}>{message}</div>
                  <br />
                </div>
              ))}
            </div>
            {/* Reply container */}
            <div className={classes.replyContainer}>
              {reply.map((rep, index) => (
                <div key={index}>
                  <div className={classes.repTextBackground}>{rep}</div>
                  <br />
                </div>
              ))}
            </div>
          </div>
          {/* Input box */}
          <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/10015/10015677.png"
              alt="consultor-img"
              className={classes.supporterImg}
            />
            <input type="text" placeholder="Enter message!" ref={messageRef} />
            <FontAwesomeIcon icon={faPaperclip} className={classes.icon} />
            <FontAwesomeIcon icon={faSmile} className={classes.icon} />
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={() => handleMessageSend(messageRef)}
              className={classes.icon}
              style={{ color: "#2fa3f0" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
