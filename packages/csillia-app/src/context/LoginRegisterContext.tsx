import React, { createContext, useContext, useState, useEffect } from "react";

export const LoginRegisterContext = createContext<any>({});

export const useLoginRegisterContext = () => useContext(LoginRegisterContext);

export const LoginRegisterProvider = ({ children }: any) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    if (showRegister || showLogin) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showRegister, showLogin]);
  return (
    <LoginRegisterContext.Provider
      value={{ showLogin, setShowLogin, showRegister, setShowRegister }}
    >
      {children}
    </LoginRegisterContext.Provider>
  );
};
