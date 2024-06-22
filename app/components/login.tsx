// components/Login.tsx
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      login({ token: data.token }); // Save token to AuthContext
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <Input
          type="text"
          variant="underlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          variant="underlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button variant="solid" type="submit">
          Login
        </Button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
