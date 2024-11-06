import React from "react";
import { Paper } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function StatisticSkeleton({ className }: any) {
  return (
    <>
      <Paper
        className={className}
        elevation={3}
        children={
          <>
            <div className="grid grid-rows-2 p-5">
              <div className="col-span-1">
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p className="text-base font-bold">
                      <Skeleton variant="text" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-3xl">
                  <Skeleton variant="text" width={90} />
                </p>
              </div>
              <div className="col-span-1 pt-2">
                <p className="text-sm text-gray-400">
                  <Skeleton variant="text" width={75} />
                </p>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default StatisticSkeleton;
