import React, { useState, useEffect, useContext } from "react";
import TimerAnimation from "../TimerAnimation";
import { BreakTime } from "../../context/TimerComponent";
import ReadingWrapper from "./ReadinWrapper";
import useRenderCount from "../../lib/isReRendered";

function ParentTimer({ isDefaultBookId, bookData, setBookId }: any) {
  const { IsActive, flipValue } = useContext(BreakTime);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (IsActive) {
      setSecondsLeft(10);
    }
  }, [IsActive]);

  useEffect(() => {
    if (IsActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [IsActive]);

  useEffect(() => {
    if (secondsLeft === 0) {
      flipValue(false);
    }
  }, [secondsLeft]);
  const isReRendered = useRenderCount();
  return (
    <div className="w-full flex justify-center">
      {!IsActive ? (
        isDefaultBookId ? (
          <h1 className="h1">No book selected</h1>
        ) : (
          <>
            <ReadingWrapper
              setBookId={setBookId}
              bookId={bookData.bookId}
              currentPage={bookData.currentPage}
            />
          </>
        )
      ) : (
        <TimerAnimation count={secondsLeft} />
      )}
    </div>
  );
}

export default ParentTimer;
