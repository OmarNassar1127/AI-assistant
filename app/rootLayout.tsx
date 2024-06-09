"use client";

import React from "react";
import Logout from "./components/logout";
import { useAuth } from "./context/AuthContext";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div>
      {user && <Logout />}
      {children}
    </div>
  );
};

export default RootLayout;
