import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter a room name");

    if (roomName) {
      // do db stuf
    }
  };

  return !addNewChat ? (
    <div className='sidebarChat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className='sidebarChat__info'>
        <h2>Room name</h2>
        <p>Last messagee..</p>
      </div>
    </div>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
