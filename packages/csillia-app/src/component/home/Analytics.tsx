import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Analytics(props: any) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <>
      <div className="md:flex mt-40 md:space-x-10 items-start">
        <div data-aos="fade-down" className="md:w-7/12 relative">
          <div className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse bg-primary200"></div>
          <div className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping bg-secondary200"></div>
          <img
            className="relative z-50 floating"
            src="assets/analytics.png"
            alt=""
          />
          <div className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-3 animate-pulse bg-warning100"></div>
          <div className="w-5 h-5 rounded-full absolute  right-52 bottom-1 animate-ping bg-blue-300 z-50"></div>
        </div>
        <div
          data-aos="fade-down"
          className="md:w-5/12 mt-20 md:mt-0 text-gray-500"
        >
          <h1 className="text-2xl font-semibold  lg:pr-40">
            Track progress with{" "}
            <span className="text-blue-800">Reading Analytics</span>
          </h1>
          <div className="flex items-center space-x-5 my-5">
            <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="#089ae2"
                viewBox="0 0 24 20"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#089ae2"
                transform="rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.048"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M5,12a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V13A1,1,0,0,0,5,12ZM10,2A1,1,0,0,0,9,3V21a1,1,0,0,0,2,0V3A1,1,0,0,0,10,2ZM20,16a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V17A1,1,0,0,0,20,16ZM15,8a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V9A1,1,0,0,0,15,8Z" />
                </g>
              </svg>
            </div>
            <p>Morbi dignissim sit amet sem a consectetur. </p>
          </div>
          <div className="flex items-center space-x-5 my-5">
            <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="#089ae2"
                viewBox="0 0 24 20"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#d425c6"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M3 3V21"
                    stroke="#efbd0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M21 21H3"
                    stroke="#efbd0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M7 16L12.25 10.75L15.75 14.25L21 9"
                    stroke="#efbd0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </div>
            <p>
              Orci varius natoque penatibus et magnis dis parturient montes.
            </p>
          </div>
          <div className="flex items-center space-x-5 my-5">
            <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 20"
                fill="#ffa742"
                width="800px"
                height="800px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffa742"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M15.999 1.129c-8.812 0-15.98 7.169-15.98 15.981 0 5.536 2.803 10.6 7.497 13.544 0.467 0.296 1.084 0.152 1.378-0.316s0.152-1.085-0.316-1.378c-1.691-1.061-3.095-2.439-4.17-4.027l1.048-0.605c0.478-0.276 0.643-0.887 0.366-1.366-0.277-0.48-0.889-0.642-1.366-0.366l-1.050 0.606c-0.763-1.579-1.228-3.306-1.353-5.107h1.113c0.552 0 1-0.448 1-1s-0.447-1-1-1h-1.108c0.132-1.834 0.618-3.572 1.393-5.143l1.005 0.58c0.157 0.091 0.329 0.134 0.499 0.134 0.346 0 0.681-0.179 0.867-0.5 0.277-0.479 0.112-1.090-0.366-1.366l-0.995-0.574c1.003-1.463 2.277-2.728 3.75-3.719l0.563 0.975c0.185 0.322 0.521 0.5 0.867 0.5 0.17 0 0.342-0.043 0.499-0.134 0.479-0.277 0.643-0.887 0.366-1.366l-0.561-0.971c1.542-0.744 3.24-1.208 5.030-1.338v1.246c0 0.553 0.447 1 1 1s1-0.447 1-1v-1.25c1.831 0.127 3.567 0.606 5.137 1.373l-0.543 0.939c-0.276 0.479-0.113 1.090 0.366 1.366 0.157 0.091 0.329 0.134 0.499 0.134 0.346 0 0.681-0.178 0.867-0.5l0.54-0.936c1.459 0.993 2.721 2.255 3.715 3.713l-0.936 0.541c-0.479 0.277-0.642 0.887-0.366 1.366 0.186 0.322 0.521 0.5 0.867 0.5 0.17 0 0.342-0.043 0.499-0.134l0.942-0.543c0.768 1.571 1.248 3.307 1.377 5.139h-1.098c-0.552 0-1 0.448-1 1s0.448 1 1 1h1.098c-0.127 1.777-0.581 3.482-1.328 5.041l-0.99-0.572c-0.477-0.276-1.091-0.111-1.366 0.366-0.276 0.479-0.113 1.090 0.366 1.366l0.993 0.573c-1.097 1.633-2.545 3.044-4.292 4.119-0.471 0.29-0.616 0.907-0.327 1.376 0.189 0.306 0.517 0.476 0.852 0.476 0.178 0 0.36-0.048 0.523-0.148 4.764-2.934 7.608-8.024 7.608-13.614 0-8.811-7.169-15.98-15.98-15.98zM23.378 13.992c0.478-0.277 0.642-0.887 0.366-1.366s-0.888-0.642-1.366-0.366l-5.432 3.136c-0.29-0.164-0.62-0.265-0.977-0.265-1.102 0-1.995 0.893-1.995 1.994 0 1.102 0.893 1.995 1.995 1.995s1.995-0.893 1.995-1.995c0-0.002-0-0.005-0-0.007z" />
                </g>
              </svg>
            </div>
            <p>
              Morbi dignissim sit amet sem a consectetur. Orci varius natoque
              penatibus et magnis dis parturient montes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;