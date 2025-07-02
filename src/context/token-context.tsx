// context/TokenContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
  loading: boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setToken = (newToken: string | null) => {
    setLoading(true);
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
    } else {
      localStorage.removeItem("auth_token");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setTokenState(storedToken);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  const isAuthenticated = () => !!token;

  return (
    <TokenContext.Provider
      value={{ token, setToken, isAuthenticated, loading }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
