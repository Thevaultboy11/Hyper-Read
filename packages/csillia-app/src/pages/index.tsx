import React, { useEffect } from "react";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();

  useEffect(()=>{
    if(router.pathname === "/") router.push("/home");
  });

  return null;
}

export default index;
