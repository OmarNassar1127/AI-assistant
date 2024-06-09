"use client";

import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import styles from "./page.module.css";
import Login from "./components/login";
import Register from "./components/register";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const categories = {
    "File search": "file-search",
  };

  if (user) {
    return (
      <main className={styles.main}>
        <div className={styles.title}>Chat with your files</div>
        <div className={styles.container}>
          {Object.entries(categories).map(([name, url]) => (
            <a key={name} className={styles.category} href={`/examples/${url}`}>
              {name}
            </a>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>Chat with your files</div>
      {showRegister ? (
        <>
          <Register />
          <p className={styles.switchText}>
            Already have an account?{" "}
            <a onClick={() => setShowRegister(false)} className={styles.link}>
              Log in!
            </a>
          </p>
        </>
      ) : (
        <>
          <Login />
          <p className={styles.switchText}>
            No account yet?{" "}
            <a onClick={() => setShowRegister(true)} className={styles.link}>
              Sign up!
            </a>
          </p>
        </>
      )}
    </main>
  );
};

export default Home;
