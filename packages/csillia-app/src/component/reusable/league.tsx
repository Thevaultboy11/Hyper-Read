import React from "react";

function League(props: any) {
  return (
    <>
      <div className={props.style}>
        <div className="row ml-10 mt-5 mb-5">
          <div className="col-12 justify-self-start mb-3">
            <p className="text-2xl font-bold">{props.league}</p>
          </div>
          <div className="md:col-span-2 col-span-12">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-12">
                <p className="font-bold text-base">Current WPM</p>
              </div>
              <div className="col-12">
                <p className="font-bold h1">{props.wpm}</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 col-span-12 md:ml-10">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-12">
                <p className="font-bold text-base">Next league</p>
              </div>
              <div className="col-12">
                <p className="font-bold h1">{props.next}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default League;
