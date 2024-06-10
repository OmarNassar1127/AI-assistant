// examples/file-search/page.tsx
"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import FileViewer from "../../components/file-viewer";
import Login from "../../components/login";
import ChatList from "../../components/chat-list";
import CreateChat from "../../components/create-chat";

const FileSearchPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleChatCreated = () => {
    // Optionally, refresh the chat list or perform other actions after a chat is created
  };

  if (!user) {
    return (
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <Login />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <CreateChat onChatCreated={handleChatCreated} />
          <ChatList onSelectChat={handleChatSelect} />
        </div>
        <div className={styles.content}>
          {selectedChatId ? (
            <>
              <div className={styles.column}>
                <FileViewer chatId={selectedChatId} />
              </div>
              <div className={styles.chatContainer}>
                <div className={styles.chat}>
                  <Chat chatId={selectedChatId} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>Select a chat to start</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FileSearchPage;
