import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function JoinNow(props: any) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <>
      <div className="bg-primary200">
        <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
          <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
            <h1
              data-aos="fade-right"
              data-aos-once="true"
              className="my-4 text-5xl font-bold leading-tight text-primary100"
            >
              <span className="text-warning100">Reading</span> Online is now
              much easier
            </h1>
            <p
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="leading-normal text-2xl mb-8 text-primary200"
            >
              Read faster, remember more with our speed reading techniques
            </p>
            <div
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay="700"
              className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5"
            >
              <button className="lg:mx-0 bg-primary300 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">
                Join now
              </button>
            </div>
          </div>
          <div className="w-full lg:w-8/12 relative mt-5" id="girl">
            <img
              data-aos="fade-up"
              data-aos-once="true"
              className="w-10/12 mx-auto 2xl:-mb-20"
              src="assets/woman.png"
            />
          </div>
        </div>
        <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-1 relative">
          <svg
            className="xl:h-40 xl:w-full"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="bg-white w-full h-20 -mt-px"></div>
        </div>
      </div>
    </>
  );
}

export default JoinNow;
