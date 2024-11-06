import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function WhoWeARe(props: any) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <>
      <div className="mt-28">
        <div
          data-aos="flip-down"
          className="text-center max-w-screen-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-4">
            What is <span className="text-blue-800">Reading app?</span>
          </h1>
          <p className="text-gray-500">
            Morbi dignissim sit amet sem a consectetur. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Praesent imperdiet sem tellus, ac tempus massa varius vel.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7"
        >
          <div className="relative md:w-5/12">
            <img
              data-aos="fade-up"
              data-aos-once="true"
              className="bottom-0 left-0 right-0 w-full h-full rounded-2xl"
              src="assets/guy.png"
            />
            <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">
                  FOR ADULTS
                </h1>
                <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out opacity-80 bg-primary200">
                  Start Reading Today
                </button>
              </div>
            </div>
          </div>
          <div className="relative md:w-5/12">
            <img
              data-aos="fade-up"
              data-aos-once="true"
              className="bottom-0 left-0 right-0 w-full h-full rounded-2xl"
              src="assets/children.png"
            />
            <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">
                  FOR CHILDREN
                </h1>
                <button className="rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out opacity-80 bg-primary200">
                  See available books
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhoWeARe;
