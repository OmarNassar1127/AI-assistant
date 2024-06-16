"use client";

import React from "react";
import { useAuth } from "./context/AuthContext";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div>
      {children}
    </div>
  );
};

export default RootLayout;
