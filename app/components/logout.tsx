import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./logout.module.css";

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <button className={styles.logout} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
