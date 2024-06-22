// components/CreateChat.tsx
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import styles from "./create-chat.module.css";

const CreateChat: React.FC<{ onChatCreated: () => void }> = ({
  onChatCreated,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const response = await fetch("/api/chats/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      onChatCreated(); // Trigger the chat list refresh
      setName("");
    } else {
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
      <Button variant="solid">Click me</Button>
    </div>
  );
};

export default CreateChat;
