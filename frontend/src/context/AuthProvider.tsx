import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../lib/api/auth";

interface AuthState {
  token: string | null;
  user: { id: string; role: string } | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  role: string | null;
  userId: string | null;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  role: null,
  userId: null,
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
    const data = await apiLogin({ email, password });
    setState({ token: data.access_token, user: decodeToken(data.access_token) });
  };

  const register = async (email: string, password: string) => {
    await apiRegister({
      email,
      password,
      first_name: "",
      last_name: "",
    });
    await login(email, password);
  };

  const logout = () => {
    setState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout ,role: state.user?.role ?? null,
      userId: state.user?.id ?? null,}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

