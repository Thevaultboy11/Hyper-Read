import React from "react";
import { useRouter } from "next/router";

function ErrorNotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-6xl text-primary200">400</h1>

      <h1 className="h2">Page not found</h1>
      <div className="flex gap-x-8">
        <button
          onClick={async () => {
            router.push("/home");
          }}
          className="min-w-max py-2 px-4 rounded-md text-black  bg-secondary200"
        >
          Go to home
        </button>
      </div>
    </div>
  );
}

export default ErrorNotFound;
