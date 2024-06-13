"use client";

import React, { useState, useRef } from "react";
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
  const chatListRef = useRef<{ fetchChats: () => void }>(null);

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleChatCreated = () => {
    if (chatListRef.current) {
      chatListRef.current.fetchChats();
    }
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
          <ChatList onSelectChat={handleChatSelect} ref={chatListRef} activeChatId={selectedChatId} />
        </div>
        <div className={styles.content} style={{ display: "flex" }}>
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
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FileSearchPage;
