import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import db from "../../firebase";
import firebase from "firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const user = useSelector((state) => state.user);
  const messagesEndRef = useRef();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("in here", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    scrollToBottom();
    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}{" "}
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map((message) => (
          <p
            className={`chat__messages ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        <div className='chat__bottom' ref={messagesEndRef} />
      </div>
      <div className='chat__footer'>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            placeholder='Type a message'
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* <button type='submit' onClick={sendMessage}>
            Send a message
          </button> */}

          <IconButton type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
          {/* <MicIcon /> */}
        </form>
      </div>
    </div>
  );
};

export default Chat;
