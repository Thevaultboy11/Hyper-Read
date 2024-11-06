import React, { createContext, useContext, useState } from "react";
export const SessionContext = createContext<any>({});
import { useSession } from "next-auth/react";

export const useSessionContext = () => useContext(SessionContext);

export const PagesProvider = ({ children }: any) => {
  const { data: session, status } = useSession();

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
