import Link from "next/link";
import React from "react";
const home_nav = [
  { title: "Home", route: "/home" },
  { title: "Test your speed", route: "/train" },
  { title: "Library", route: "/library" },
];
function JoinNow(props: any) {
  return (
    <>
      <div className="w-full bg-primary200 text-gray-700">
        <div className="mx-auto flex max-w-screen-xl flex-col px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-row items-center justify-between py-6">
            <div className="relative md:mt-8">
              <a
                href="#"
                className="z- focus:shadow-outline relative rounded-lg text-lg  font-bold tracking-widest text-white focus:outline-none"
              >
                Reading app
              </a>
            </div>
            {/* ikone broj jedan */}
            <button className="focus:shadow-outline rounded-lg focus:outline-none md:hidden">
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                <path
                  x-show="!open"
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path
                  x-show="open"
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav
            id="navbar"
            className="flex h-0 flex-grow origin-top flex-col pb-4 text-white duration-300 md:flex md:h-auto md:flex-row md:items-center md:justify-end md:pb-0"
          >
            {home_nav.map((i: any, idx: number) => (
              <Link href={i.route} key={idx}>
                <p className="focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm hover:text-gray-900 focus:outline-none md:mt-8 md:ml-4">
                  {i.title}{" "}
                </p>
              </Link>
            ))}

            <a
              className="btn-blue mt-2 rounded-full bg-white px-10 py-3 text-center text-sm text-gray-800 md:mt-8 md:ml-4"
              href="#"
            >
              Login
            </a>
            <a
              className="btn-white mt-2 rounded-full bg-warning100 px-10 py-3 text-center text-sm text-white md:mt-8 md:ml-4"
              href="#"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

export default JoinNow;
