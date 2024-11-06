import React, { useEffect } from "react";
import JoinNow from "../component/home/JoinNow";
import Benefits from "../component/home/Benefits";
import WhoWeAre from "../component/home/WhoWeAre";
import Analytics from "../component/home/Analytics";
import Testimonial from "../component/home/Testimonial";
import { getServerSession } from "next-auth/next";
import { Options } from "./api/auth/[...nextauth]";
import handle_protected_routes from "../lib/auth/handle_protected_routes";
import { ForbiddenError } from "../lib/exceptions";
function Home(props: any) {
  return (
    <>
    
      <div className="antialiased">
        <JoinNow></JoinNow>
        <div className="container mx-auto max-w-screen-xl overflow-y-hidden px-4 text-gray-700 lg:px-8">
          <Benefits></Benefits>
          <WhoWeAre></WhoWeAre>
          <Analytics></Analytics>
          <Testimonial></Testimonial>
        </div>
      </div>
    </>
  );
}

export default Home;
