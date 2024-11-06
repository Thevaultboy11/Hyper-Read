import React, { useState, useEffect, useContext, memo } from "react";
import { BreakTime } from "../../context/TimerComponent";

const TimeUntilBreak = memo(() => {
  const [secondsLeft, setSecondsLeft] = useState(10 * 60); // 10 minutes in seconds
  const { IsActive, flipValue } = useContext(BreakTime);

  useEffect(() => {
    if (!IsActive) {
      setSecondsLeft(10 * 60); // reset timer to 10 minutes
    }
  }, [IsActive]);

  useEffect(() => {
    if (!IsActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [IsActive]);

  useEffect(() => {
    if (secondsLeft === 0) {
      flipValue(true);
    }
  }, [secondsLeft]);

  // convert remaining seconds to minutes and seconds
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // add leading zero to single digit seconds
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return <div className="text-gray-400">Time left: {`${minutes}`} minutes</div>;
});

export default TimeUntilBreak;
