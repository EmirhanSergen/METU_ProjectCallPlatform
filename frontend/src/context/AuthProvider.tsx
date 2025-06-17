import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

interface AuthState {
  token: string | null;
  user: { id: string; role: string } | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

function decodeToken(token: string): { id: string; role: string } | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { id: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      return { token: stored, user: decodeToken(stored) };
    }
    return { token: null, user: null };
  });

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [state.token]);

  const login = async (email: string, password: string) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setState({ token: data.access_token, user: decodeToken(data.access_token) });
  };

  const register = async (email: string, password: string) => {
    await apiFetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, first_name: "", last_name: "" }),
    });
    await login(email, password);
  };

  const logout = () => {
    setState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

