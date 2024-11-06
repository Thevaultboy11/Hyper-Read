import React, { useState, useEffect } from "react";
import { useSprings, animated } from "react-spring";
import Wave from "react-wavify";

function TimerAnimation({ count }: any) {
  const numbers = Array.from({ length: 10 }, (_, i) => 10 - i);

  const height = 100;

  const springs = useSprings(
    numbers.length,
    numbers.map((num, index) => {
      const distanceToTop = (numbers.length - index) * height;
      return {
        opacity: count >= num ? 1 : 0,
        transform: `translateY(${(count - num) * height - distanceToTop}px)`,
        padding: "0.3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        top: `${distanceToTop}px`,
      };
    })
  );

  return (
    <>
      <div className="max-h-screen flex  flex-col justify-center items-center">
        <div className="h-40 w-40  absolute overflow-clip text-primary200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-full h-full">
            {springs.map((props, index) => (
              <animated.div
                key={index}
                style={{
                  ...props,
                  textAlign: "center",
                  fontSize: "8rem",
                  fontWeight: "bold",
                }}
              >
                {numbers[index]}
              </animated.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0  pt-20  h-60 flex flex-col justify-center items-center w-full">
        <div className="relative w-full h-full">
          <div className="h1 absolute text -bottom-50 -right-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white m-auto">
            Taking a break..
          </div>
          <Wave
            id="wave"
            fill="#049dd9"
            paused={false}
            options={{
              height: 5,
              amplitude: 20,
              speed: 0.45,
              points: 3,
            }}
          >
            {" "}
          </Wave>
        </div>
      </div>
    </>
  );
}

export default TimerAnimation;
