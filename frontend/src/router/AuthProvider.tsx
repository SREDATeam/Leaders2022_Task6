import { createContext, useState } from "react";
import { loginUser } from "api/user";

export const AuthContext = createContext({
  token: false,
  onLogin: (login: string, password: string) => {},
  onLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(
    sessionStorage.getItem("token") === "true",
  );

  const handleLogin = (login: string, password: string) => {
    return loginUser({ login, password })
      .then((request) => {
        setToken(true);
        sessionStorage.setItem("token", "true");
        return request.status;
      })
      .catch((err) => {
        return err.status;
      });
  };

  const handleLogout = () => {
    setToken(false);
    sessionStorage.setItem("token", "false");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
