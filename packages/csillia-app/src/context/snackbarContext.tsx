import React, { createContext, useContext, useState } from "react";
import { useSnackbar } from "notistack";

export const SnackbarContext = createContext<any>({});

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProviderMessage = ({ children }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const showSucsses = (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
    });
  };
  const showError = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSucsses, showError }}>
      {children}
    </SnackbarContext.Provider>
  );
};
