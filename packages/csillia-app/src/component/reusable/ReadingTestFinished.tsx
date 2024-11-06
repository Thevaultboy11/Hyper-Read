import React from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
function ReadingTestFinished({ wpm, setTestState }: any) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;
  return (
    <div className="h-96 bg-white rounded-xl p-4">
      <div className="w-full  flex justify-between items-center pb-4">
        <h1>Your wpm is {wpm}</h1>
      </div>
      <div className="row">
        <div className="col-span-6 p-8 flex flex-col gap-y-4">
          <h1>Practice your skills</h1>
          <Link href="/analytics">
            <button className="btn-blue px-6 py-4 rounded-full">
              See your analytics
            </button>
          </Link>
        </div>
        <div className="col-span-6 p-8 flex flex-col gap-y-4">
          <h1>Learn about speed reading</h1>
          <button
            onClick={async () => {
              await queryClient.invalidateQueries({
                queryKey: [`readingTest/user/${userID}`],
              });
              setTestState("start");
            }}
            className="hover:bg-secondary300 bg-secondary200 text-white px-6 py-4 rounded-full"
          >
            Retake the test
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadingTestFinished;
