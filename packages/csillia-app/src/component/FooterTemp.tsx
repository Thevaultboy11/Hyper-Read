import React, { useEffect } from "react";

function FooterTemp(props: any) {
  return (
    <>
      <footer className="mt-32 bg-blue-800">
        <div className="max-w-lg mx-auto">
          <div className="flex py-12 justify-center text-white items-center px-20 sm:px-36">
            <div className="relative">
              <h1 className="font-bold text-xl pr-5 relative z-1">
                FlipProtocol
              </h1>
            </div>
            <span className="border-l border-gray-500 text-sm pl-5 py-2 font-semibold">
              Tagline goes here
            </span>
          </div>
          <div className="flex items-center text-gray-400 text-sm justify-center">
            <a href="" className="pr-3">
              About
            </a>
            <a href="" className="border-l border-gray-400 px-3">
              Privacy
            </a>
            <a href="" className="border-l border-gray-400 pl-3">
              Terms & Conditions
            </a>
          </div>
          <div className="text-center text-white">
            <p className="my-3 text-gray-400 text-sm">
              &copy; 2023 FlipProtocol{" "}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterTemp;
