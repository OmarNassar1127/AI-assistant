// components/CreateChat.tsx
import React, { useState } from "react";
import styles from "./create-chat.module.css";

const CreateChat: React.FC<{ onChatCreated: () => void }> = ({
  onChatCreated,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("/api/chats/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      onChatCreated();
      setName("");
    } else {
      console.error("Failed to create chat:", response.statusText);
    }
  };

  return (
    <div className={styles.createChat}>
      <h2>Create New Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Chat name"
          required
        />
        <button type="submit">Create Chat</button>
      </form>
    </div>
  );
};

export default CreateChat;
