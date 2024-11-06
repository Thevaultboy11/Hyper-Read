import React, { useContext, useState } from "react";
import { LoginRegisterContext } from "../../context/LoginRegisterContext";

function LoginRegisterComponents({ ctx }: any) {
  const { showLogin, setShowLogin, showRegister, setShowRegister } =
    useContext(LoginRegisterContext);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        className="px-10 py-3 mt-2 text-sm text-center bg-white text-gray-800 rounded-full md:mt-8 md:ml-4 btn-blue"
        onClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      >
        Sign up
      </button>
      <button
        className="px-10 py-3 mt-2 text-sm text-center bg-warning100 text-white rounded-full md:mt-8 md:ml-4 btn-white"
        onClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
      >
        Sign in
      </button>
    </div>
  );
}

export default LoginRegisterComponents;
