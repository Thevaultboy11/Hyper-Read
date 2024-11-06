import React from "react";
import { Skeleton } from "@mui/material";

function LeagueSkeleton() {
  return (
    <>
      <div className="col-12 bg-gray-300 rounded-md">
        <div className="row ml-10 mt-5 mb-5">
          <div className="col-12 justify-self-start mb-3">
            <p className="text-2xl font-bold">
              <Skeleton variant="text" width={60} />
            </p>
          </div>
          <div className="md:col-span-2 col-span-12">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-12">
                <p className="font-bold text-base">
                  <Skeleton variant="text" width={120} />
                </p>
              </div>
              <div className="col-12">
                <p className="font-bold h1">
                  <Skeleton variant="text" width={70} />
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 col-span-12 md:ml-10">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-12">
                <p className="font-bold text-base">
                  <Skeleton variant="text" width={120} />
                </p>
              </div>
              <div className="col-12">
                <p className="font-bold h1">
                  <Skeleton variant="text" width={70} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeagueSkeleton;
