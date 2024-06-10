// components/ChatList.tsx
import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./chat-list.module.css";

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
}

const ChatList = forwardRef<unknown, ChatListProps>(({ onSelectChat }, ref) => {
  const [chats, setChats] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchChats = useCallback(async () => {
    if (!user?.token) {
      return;
    }

    const response = await fetch("/api/chats/list", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setChats(Array.isArray(data) ? data : []);
    } else {
    }
  }, [user]);

  useImperativeHandle(ref, () => ({
    fetchChats,
  }));

  useEffect(() => {
    fetchChats();
  }, [user, fetchChats]);

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
});

export default ChatList;
