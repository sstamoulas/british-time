import React, { useState } from 'react';

import Chat from './../../components/chat/chat.component';

const rooms = ['Grammer', 'Vocabulary'];

const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);

  const handleRoomChange = (event) => {
    const { textContent } = event.target;
    setChatRoom(textContent);
  }

  return (
    <div>
      <ul>
        {
          rooms.map((room) => (
            <li key={room} value={room} onClick={handleRoomChange}>{room}</li>
          ))
        }
      </ul>
      <div>
      {
        chatRoom &&
          <Chat room={chatRoom} />
      }
      </div>
    </div>
  )
};

export default ChatRoom;