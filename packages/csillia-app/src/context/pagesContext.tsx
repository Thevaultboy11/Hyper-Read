import React, { createContext, useContext, useState } from "react";
export const PagesContext = createContext<any>({});

export const usePagesContext = () => useContext(PagesContext);

export const PagesProvider = ({ children }: any) => {
  const [wpm, set_wpm] = useState(100);
  const [chunk, set_chunk] = useState(1);

  return (
    <PagesContext.Provider value={{ wpm, chunk, set_wpm, set_chunk }}>
      {children}
    </PagesContext.Provider>
  );
};
