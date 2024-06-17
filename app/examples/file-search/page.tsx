"use client";
import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import FileViewer from "../../components/file-viewer";
import DocumentViewer from "../../components/document-viewer";
import Login from "../../components/login";
import ChatList from "../../components/chat-list";
import CreateChat from "../../components/create-chat";
import Logout from "../../components/logout";

const FileSearchPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const chatListRef = useRef<{ fetchChats: () => void }>(null);
  const [highlightedQuotes, setHighlightedQuotes] = useState<string[]>([]);

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleChatCreated = () => {
    if (chatListRef.current) {
      chatListRef.current.fetchChats();
    }
  };

  const updateHighlightedQuotes = (quotes: string[]) => {
    console.log(quotes);
    setHighlightedQuotes(quotes);
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
          <Logout />
        </div>
        <div className={styles.content}>
          {selectedChatId ? (
            <>
              <div className={styles.fileViewerContainer}>
                <FileViewer chatId={selectedChatId} />
              </div>
              <div className={styles.chatContainer}>
                <div className={styles.chat}>
                  <Chat 
                    chatId={selectedChatId} 
                    updateHighlightedQuotes={updateHighlightedQuotes} 
                  />
                </div>
              </div>
              <div className={styles.documentViewerContainer}>
                <DocumentViewer 
                  chatId={selectedChatId} 
                  highlightedQuotes={highlightedQuotes} 
                />
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
