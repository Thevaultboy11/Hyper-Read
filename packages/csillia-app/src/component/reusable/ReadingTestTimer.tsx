import React, { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import SelectWpm from "./SelectWpm";
const text = [
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, pariatur cumque. Hic laboriosam excepturi ullam nobis ipsa voluptas magni veniam.`,
  `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium sunt, quo quae, repellendus blanditiis nobis incidunt porro ipsam cum doloremque veniam omnis quaerat ratione officiis? Sit, reprehenderit? Distinctio, quisquam!`,
  `
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem totam ipsam ducimus in velit ea perspiciatis? Debitis laboriosam veniam, quod impedit doloribus ipsum magnam culpa soluta vero natus. Minus, fuga.`,
];
const ReadingTimerComponent = ({ onTimerComplete }: any) => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      onTimerComplete();
    }
  }, [timeRemaining, onTimerComplete]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};
function ReadingTestStart({
  setTestState,
  title,
  author,
  pages,
  setWpm,
  testState,
}: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function handleTimerComplete() {
    setIsFinished(true);
  }
  const calculateWpm = async (index: number) => {
    let combined = 0;
    for (let i = 0; i < currentPage; i++) {
      combined += pages[currentPage].split("").length;
    }
    await setTestState("finished");
    setWpm(combined + index);
  };
  return (
    <div className="p-4 min-h-96 bg-white rounded-xl">
      <div className="w-full  flex justify-between items-center pb-4">
        <div className="flex items-center justify-start gap-x-4">
          <MdOutlineKeyboardArrowLeft
            size="2em"
            onClick={() => {
              if (currentPage == 0) {
                return;
              }
              setCurrentPage(currentPage - 1);
            }}
            className="text-xl cursor-pointer hover:text-primary200"
          />
          <MdOutlineKeyboardArrowRight
            size="2em"
            onClick={() => {
              //posible bug
              if (currentPage == text.length - 1) {
                return;
              }
              setCurrentPage(currentPage + 1);
            }}
            className="text-xl cursor-pointer hover:text-primary200"
          />
          <p className="">
            {currentPage + 1} : {text.length}
          </p>
        </div>
        {isFinished ? (
          <>
            <h1 className="mx-auto">Select where you left off</h1>
          </>
        ) : (
          <>
            {" "}
            <h1 className="">{title}</h1>
            <ReadingTimerComponent onTimerComplete={handleTimerComplete} />
          </>
        )}
      </div>
      <p className="p1 mt-4">
        <SelectWpm
          textArray={pages[currentPage]}
          isFinished={isFinished}
          calculateWpm={calculateWpm}
        />{" "}
      </p>
    </div>
  );
}

export default ReadingTestStart;
