import React from "react";

function ReadingTestStart({ setTestState }: any) {
  return (
    <div className="h-96 bg-white rounded-xl p-8">
      <div className="w-full flex justify-between items-center pb-4">
        <h1 className="h5">Start your test</h1>
        <button
          onClick={async () => {
            setTestState("playing");
          }}
          className="btn-blue px-6 py-4 rounded-full"
        >
          Start
        </button>
      </div>
      <p className="p1 mt-4">
        Welcome to our WPM test! You have one minute to read the following
        passage and then select the word you left off on. Remember, accuracy is
        important, but so is speed! Here's the passage
      </p>
    </div>
  );
}

export default ReadingTestStart;
