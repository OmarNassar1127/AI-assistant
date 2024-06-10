// components/ChatList.tsx
import React, { useState, useEffect } from "react";
import styles from "./chat-list.module.css";

const ChatList: React.FC<{ onSelectChat: (chatId: number) => void }> = ({
  onSelectChat,
}) => {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/chats/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.headers);
      if (response.ok) {
        const data = await response.json();
        setChats(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch chats:", response.statusText);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className={styles.chatList}>
      <h2>Your Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
