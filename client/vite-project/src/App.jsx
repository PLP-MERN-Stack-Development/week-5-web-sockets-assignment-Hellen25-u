import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      console.log("Received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chatMessage", "Hello, World!");
  };

  return (
    <div>
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatComponent;