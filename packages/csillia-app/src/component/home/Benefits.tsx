import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Benefits(props: any) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <>
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center">
        <h1 className="font-bold my-3 h1">
          Read <span className="text-blue-800">faster with us</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          FlipProtocol provides an intuitive and immersive reading experience,
          making it the ideal solution for anyone looking to optimize their
          reading skills.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
        <div
          data-aos="fade-up"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 bg-warning100">
            <svg
              className="w-16 h-10 text-white"
              viewBox="6 -3 10 30"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                stroke="#f2df80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5.48999V20.49"
                stroke="#f2df80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.75 8.48999H5.5"
                stroke="#f2df80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 11.49H5.5"
                stroke="#f2df80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-primary400">
            Benefit 1
          </h1>
          <p className="px-4 text-gray-500">
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Praesent imperdiet sem tellus, ac tempus
            massa varius vel.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 bg-secondary200">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C11.0532 0 10.2857 0.767511 10.2857 1.71432V5.14285H13.7142V1.71432C13.7142 0.767511 12.9467 0 12 0Z"
                fill="#F5F5FC"
              />
              <path
                d="M36 0C35.0532 0 34.2856 0.767511 34.2856 1.71432V5.14285H37.7142V1.71432C37.7143 0.767511 36.9468 0 36 0Z"
                fill="#F5F5FC"
              />
              <path
                d="M42.8571 5.14282H37.7143V12C37.7143 12.9468 36.9468 13.7143 36 13.7143C35.0532 13.7143 34.2857 12.9468 34.2857 12V5.14282H13.7142V12C13.7142 12.9468 12.9467 13.7143 11.9999 13.7143C11.0531 13.7143 10.2856 12.9468 10.2856 12V5.14282H5.14285C2.30253 5.14282 0 7.44535 0 10.2857V42.8571C0 45.6974 2.30253 48 5.14285 48H42.8571C45.6975 48 48 45.6974 48 42.8571V10.2857C48 7.44535 45.6975 5.14282 42.8571 5.14282ZM44.5714 42.8571C44.5714 43.8039 43.8039 44.5714 42.857 44.5714H5.14285C4.19605 44.5714 3.42854 43.8039 3.42854 42.8571V20.5714H44.5714V42.8571Z"
                fill="#F5F5FC"
              />
              <path
                d="M13.7142 23.9999H10.2857C9.33889 23.9999 8.57138 24.7674 8.57138 25.7142C8.57138 26.661 9.33889 27.4285 10.2857 27.4285H13.7142C14.661 27.4285 15.4285 26.661 15.4285 25.7142C15.4285 24.7674 14.661 23.9999 13.7142 23.9999Z"
                fill="#F5F5FC"
              />
              <path
                d="M25.7143 23.9999H22.2857C21.3389 23.9999 20.5714 24.7674 20.5714 25.7142C20.5714 26.661 21.3389 27.4285 22.2857 27.4285H25.7143C26.6611 27.4285 27.4286 26.661 27.4286 25.7142C27.4286 24.7674 26.6611 23.9999 25.7143 23.9999Z"
                fill="#F5F5FC"
              />
              <path
                d="M37.7143 23.9999H34.2857C33.3389 23.9999 32.5714 24.7674 32.5714 25.7142C32.5714 26.661 33.3389 27.4285 34.2857 27.4285H37.7143C38.6611 27.4285 39.4286 26.661 39.4286 25.7142C39.4286 24.7674 38.661 23.9999 37.7143 23.9999Z"
                fill="#F5F5FC"
              />
              <path
                d="M13.7142 30.8571H10.2857C9.33889 30.8571 8.57138 31.6246 8.57138 32.5714C8.57138 33.5182 9.33889 34.2857 10.2857 34.2857H13.7142C14.661 34.2857 15.4285 33.5182 15.4285 32.5714C15.4285 31.6246 14.661 30.8571 13.7142 30.8571Z"
                fill="#F5F5FC"
              />
              <path
                d="M25.7143 30.8571H22.2857C21.3389 30.8571 20.5714 31.6246 20.5714 32.5714C20.5714 33.5182 21.3389 34.2857 22.2857 34.2857H25.7143C26.6611 34.2857 27.4286 33.5182 27.4286 32.5714C27.4286 31.6246 26.6611 30.8571 25.7143 30.8571Z"
                fill="#F5F5FC"
              />
              <path
                d="M37.7143 30.8571H34.2857C33.3389 30.8571 32.5714 31.6246 32.5714 32.5714C32.5714 33.5182 33.3389 34.2857 34.2857 34.2857H37.7143C38.6611 34.2857 39.4286 33.5182 39.4286 32.5714C39.4285 31.6246 38.661 30.8571 37.7143 30.8571Z"
                fill="#F5F5FC"
              />
              <path
                d="M13.7142 37.7142H10.2857C9.33889 37.7142 8.57138 38.4817 8.57138 39.4286C8.57138 40.3754 9.33889 41.1428 10.2857 41.1428H13.7142C14.661 41.1428 15.4285 40.3753 15.4285 39.4284C15.4285 38.4816 14.661 37.7142 13.7142 37.7142Z"
                fill="#F5F5FC"
              />
              <path
                d="M25.7143 37.7142H22.2857C21.3389 37.7142 20.5714 38.4817 20.5714 39.4285C20.5714 40.3754 21.3389 41.1429 22.2857 41.1429H25.7143C26.6611 41.1429 27.4286 40.3754 27.4286 39.4285C27.4286 38.4817 26.6611 37.7142 25.7143 37.7142Z"
                fill="#F5F5FC"
              />
              <path
                d="M37.7143 37.7142H34.2857C33.3389 37.7142 32.5714 38.4817 32.5714 39.4285C32.5714 40.3754 33.3389 41.1429 34.2857 41.1429H37.7143C38.6611 41.1429 39.4286 40.3754 39.4286 39.4285C39.4286 38.4817 38.661 37.7142 37.7143 37.7142Z"
                fill="#F5F5FC"
              />
            </svg>
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-primary400">
            Benefit 2
          </h1>
          <p className="px-4 text-gray-500">
            Morbi dignissim sit amet sem a consectetur. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Praesent imperdiet sem tellus
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 bg-primary200">
            <svg
              className="w-6 h-6 text-white"
              fill="#fff"
              width="800px"
              height="800px"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.5 0c-.654 0-.65 1 0 1h6.842c.72 0 .73.408.554.77l-3.84 7.5c-.172.334.07.73.444.73h7.072c.15 0 .323.093.39.248.07.155.095.443-.288.95L10.33 27.57l1.664-9.988c.05-.305-.185-.583-.494-.582H7.54c-.557 0-.6-.164-.505-.934l1.96-14.5c.09-.66-.903-.794-.99-.132l-1.962 14.5c-.075.556-.06 1.048.203 1.46.264.413.768.606 1.293.606h3.368L9.006 29.418c-.086.516.578.8.892.383l13.575-18c.524-.694.643-1.406.406-1.95-.24-.544-.77-.85-1.308-.85h-6.254l3.467-6.77c.188-.368.316-.856.12-1.36C19.707.363 19.12 0 18.34 0z" />
            </svg>
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-primary400">
            Benefit 3
          </h1>
          <p className="px-4 text-gray-500">
            Morbi dignissim sit amet sem a consectetur. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Praesent imperdiet sem tellus, ac tempus massa varius vel.{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Benefits;
