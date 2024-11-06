import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { RxHamburgerMenu } from "react-icons/rx";
import LoginRegisterComponents from "./LoginRegisterComponents";
import ProfileComponent from "./ProfileComponent";

function SideNavbar({ navigation, isLogged, ctx }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="circle  mt-2 cursor-pointer rounded-full  bg-primary400 py-2 md:mt-8 md:ml-4"
      >
        {!isOpen ? (
          <RxHamburgerMenu size="1.5em" />
        ) : (
          <AiOutlineClose size="1.5em" />
        )}{" "}
      </div>
      <div
        className={`fixed top-0 left-0     z-10 flex h-screen w-64 flex-col gap-y-8 bg-primary200 p-4  shadow-lg transition-transform md:hidden ${
          !isOpen ? "-translate-x-full " : "translate-x-0"
        }`}
      >
        <div className="">
          <Link href="/home">
            <p className="z-2  focus:shadow-outline cursor-pointer rounded-lg text-lg  font-bold tracking-widest text-white focus:outline-none">
              Reading app
            </p>
          </Link>
        </div>
        <div>
          {navigation.map((i: any, idx: number) => {
            return (
              <Link href={i.route} key={idx}>
                <div
                  className={`mb-4 flex w-5/6 items-center rounded-lg    hover:cursor-pointer`}
                >
                  <span className="h5">{i.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          {!isLogged ? (
            <LoginRegisterComponents ctx={ctx} />
          ) : (
            <div className="mt-2 flex  items-center py-2 md:mt-8 md:ml-4">
              {" "}
              <ProfileComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
