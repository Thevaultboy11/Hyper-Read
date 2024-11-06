import React, { useEffect, useState } from "react";
import ReadingTestStart from "../component/reusable/ReadingTestStart";
import { get_reading_test } from "../routes/books/get_reading_test";
import { useQuery } from "@tanstack/react-query";
import StatisticSkeleton from "../component/reusable/skeleton/StatisticsSkeleton";
import ReadingTestTimer from "../component/reusable/ReadingTestTimer";
import ReadingTestFinished from "../component/reusable/ReadingTestFinished";
import handle_protected_routes from "../lib/auth/handle_protected_routes";
import { useSession } from "next-auth/react";
import { get_random_books } from "../routes/books/get_random_books";
function extractPageValues(obj: any) {
  const pagesObject = obj;
  const valuesArray = Object.values(pagesObject);
  return valuesArray;
}

function TestComponent() {
  const [testState, setTestState] = useState("start");
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [`readingTest/user/${userID}`],
    queryFn: async () => await get_random_books(),
  });

  const [wpm, setWpm] = useState();

  let el = null;

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <StatisticSkeleton
            className="col-span-12 h-80"
            variant="rect"
            width={400}
            height={400}
          />
          <StatisticSkeleton
            className="col-span-12 h-80"
            variant="rect"
            width={400}
            height={400}
          />
        </div>
      </div>
    );
  }

  if (isFetched) {
    const { title, author } = data?.metadata || {};
    if (testState == "start") {
      el = <ReadingTestStart setTestState={setTestState} />;
    }
    if (testState == "playing") {
      el = (
        <ReadingTestTimer
          setTestState={setTestState}
          testState={testState}
          title={title}
          author={author}
          pages={extractPageValues(data.data.pages)}
          setWpm={setWpm}
        />
      );
    }
    if (testState == "finished") {
      el = <ReadingTestFinished wpm={wpm} setTestState={setTestState} />;
    }

    return (
      <div className="container">
        {testState == "start" ? (
          <div className="flex flex-col gap-y-4">
            {" "}
            <div className="h-96 rounded-xl bg-white p-8">
              <div className="flex w-full items-center justify-between pb-4">
                <h1 className="h5">Why should you test yourself?</h1>
              </div>
              <p className="p1 mt-4">
                Testing yourself with the speed reading test module is a great
                way to improve your speed reading skills. To get the best
                results, it's important to approach the test with the right
                mindset and strategy. First, take the time to properly warm up
                your brain and body, as this can significantly impact your
                reading speed and comprehension. Next, focus on maintaining a
                steady pace, and avoid the temptation to regress or pause during
                the test.{" "}
              </p>
            </div>
            {el}
          </div>
        ) : (
          <>{el}</>
        )}
      </div>
    );
  }
}

export default TestComponent;

export async function getServerSideProps(context: any) {
  return handle_protected_routes(context.req, context.res);
}
