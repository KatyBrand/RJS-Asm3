import React, { useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./LiveChat.module.css";
// import "emoji-mart/css/emoji-mart.css";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

new Picker({ data });

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageRef = useRef();

  const handleMessageSend = (message) => {
    if (message.current.value.trim().length === 0) {
      return;
    }
    setMessages([...messages, message.current.value]);
    messageRef.current.value = "";
    // Logic to send message to backend or messaging service
  };

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.native);
  };

  return (
    <div className={classes.livechatContainer}>
      {isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 5,
            width: 400,
            height: 400,
            padding: "12px",
          }}
        >
          {/* Header with close button */}
          <div className={classes.header}>
            <h6>Customer Support</h6>
            <p>Let's Chat App</p>
            {/* <button onClick={onClose}>Close</button> */}
          </div>
          {/* Message container */}
          <div className={classes.messageContainer}>
            {messages.map((message, index) => (
              <div>
                <div key={index} className={classes.textBackground}>
                  {message}
                </div>
                <br />
              </div>
            ))}
          </div>
          {/* Input box */}
          <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/10015/10015677.png"
              alt="consultor-img"
              style={{
                width: 50,
                height: "auto",
                borderRadius: "50%",
                paddingRight: 8,
              }}
            />
            <input
              type="text"
              placeholder="Enter message!"
              ref={messageRef}
              // value={messageRef}
            />

            <FontAwesomeIcon icon={faPaperclip} className={classes.icon} />
            <FontAwesomeIcon
              icon={faSmile}
              className={classes.icon}
              onClick={() => setShowEmojiPicker((prevS) => !prevS)}
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              G
              onClick={() => handleMessageSend(messageRef)}
              className={classes.icon}
              style={{ color: "blue" }}
            />
          </div>
          {showEmojiPicker && (
            <Picker data={data} onSelect={handleEmojiSelect} />
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChat;
