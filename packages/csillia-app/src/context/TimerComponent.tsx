import React, { createContext, useState } from "react";

export const BreakTime = createContext(false);

export const BreakTimeProvider = ({ children }: any) => {
  const [IsActive, setIsActive] = useState(false);

  const flipValue = () => {
    setIsActive((prevValue) => !prevValue);
  };

  return (
    <BreakTime.Provider value={{ IsActive, flipValue }}>
      {children}
    </BreakTime.Provider>
  );
};
