"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import FileViewer from "../../components/file-viewer";
import Login from "../../components/login";

const FileSearchPage: React.FC = () => {
  const { user } = useAuth();

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
        <div className={styles.column}>
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FileSearchPage;
