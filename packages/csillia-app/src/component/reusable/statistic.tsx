import React from "react";
import { Paper } from "@mui/material";

function Statistic(props: any) {
  return (
    <>
      <Paper
        className="md:col-span-4 col-span-12"
        elevation={3}
        children={
          <>
            <div className="grid grid-rows-2 p-5">
              <div className="col-span-1">
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p className="text-base font-bold">{props.header}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-3xl">{props.value}</p>
              </div>
              <div className="col-span-1 pt-2">
                <p className="text-sm text-gray-400">{props.footer}</p>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Statistic;
