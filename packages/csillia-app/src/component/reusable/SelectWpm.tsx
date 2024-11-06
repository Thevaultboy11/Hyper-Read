import React from "react";

function SelectWpm({ textArray, onClickLabel, isFinished, calculateWpm }: any) {
  const handleClick = (index) => {
    if (!isFinished) {
      return;
    }
    calculateWpm(index);
  };

  const combinedIndex = (index, arrayIndex) => {
    let combined = 0;
    for (let i = 0; i < arrayIndex; i++) {
      combined += textArray[i].length;
    }
    return combined + index;
  };

  return (
    <div>
      {textArray.split(" ").map((word, index) => (
        <span
          className={`${
            isFinished
              ? "cursor-pointer p-2 rounded-full hover:bg-primary200 hover:text-white"
              : "text-black"
          }  `}
          key={index}
          onClick={() => handleClick(index)}
        >
          {word}{" "}
        </span>
      ))}
    </div>
  );
}

export default SelectWpm;
