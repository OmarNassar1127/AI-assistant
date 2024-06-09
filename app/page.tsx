// pages/index.tsx
"use client";

import React, { useContext } from "react";
import styles from "./page.module.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/login";

const Home: React.FC = () => {
  const authContext = useAuth();

  if (!authContext) {
    return null;
  }

  const { user } = authContext;

  const categories = {
    // "Basic chat": "basic-chat",
    // "Function calling": "function-calling",
    "File search": "file-search",
    // All: "all",
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>Chat with your files</div>
      {user ? (
        <div className={styles.container}>
          {Object.entries(categories).map(([name, url]) => (
            <a key={name} className={styles.category} href={`/examples/${url}`}>
              {name}
            </a>
          ))}
        </div>
      ) : (
        <Login />
      )}
    </main>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
