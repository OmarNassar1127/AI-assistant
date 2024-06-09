import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./logout.module.css";

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default Logout;
