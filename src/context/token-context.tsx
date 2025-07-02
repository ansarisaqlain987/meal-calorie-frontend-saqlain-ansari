"use client";
import React, { createContext, useContext, useState, useMemo } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      token,
      setToken,
      isAuthenticated: () => !!token,
    }),
    [token]
  );

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
