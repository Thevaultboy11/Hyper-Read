import React, { useRef, useEffect } from "react";
import { Paper } from "@mui/material";

function ReadingScrollComponent({ page, words, index }: any) {
  const activePacerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (activePacerRef.current) {
      activePacerRef.current.scrollBy(10, 1);
    }
  }, [index]);

  useEffect(() => {
    if (activePacerRef.current) {
      activePacerRef.current.scrollTo(0, 0);
    }
  }, [words]);
  return (
    <>
      <div
        ref={activePacerRef}
        className="custom-scrollbar bg-white relative flex   h-80 w-full flex-col overflow-y-scroll px-16"
      >
        <div className="flex h-full w-full flex-col">
          <div className="h1 sticky top-0 right-0 h-12 w-full select-none bg-white text-white ">
            a
          </div>
          <div className="h-full w-full flex-1 ">
            {words.map((word: any, i: any) => {
              const highlighted = i === index - 1;
              return (
                <span
                  key={i}
                  className={`${
                    highlighted ? "bg-primary200 text-white " : "bg-transparent"
                  } h4 `}
                >
                  {word}{" "}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadingScrollComponent;
