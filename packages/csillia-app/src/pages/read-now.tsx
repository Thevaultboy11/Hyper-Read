import SelectBook from "../component/readingComponent/SelectBook";
import React, { memo, useEffect, useRef, useState } from "react";
import TimerComponent from "../component/readingComponent/TimerComponent";
import useRenderCount from "../lib/isReRendered";
import handle_protected_routes from "../lib/auth/handle_protected_routes";
import { Options } from "../pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

function ReadNow(props: any) {
  const [bookData, setBookId] = useState<any>(null);
  const initialBookIdRef = useRef(bookData);
  const isDefaultBookId = bookData === initialBookIdRef.current;
  const { data, status } = useSession();
  const selectBook = ({ bookId, currentPage, totalPages }: any) => {
    setBookId({ bookId: bookId, currentPage: currentPage });
  };

  return (
    <>
      <div
        className={`${isDefaultBookId ? "justify-start" : "justify-center"} 
     container flex flex-col gap-y-8`}
      >
        <SelectBook selectBook={selectBook} />
        <TimerComponent
          isDefaultBookId={isDefaultBookId}
          bookData={bookData}
          setBookId={setBookId}
        />
      </div>
    </>
  );
}

export default ReadNow;

export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;

  const session = await getServerSession(req, res, Options);

  if (!session) {
    // User is not logged in, redirect to home page
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_PATH}/auth/isAdmin`,
      {
        headers: {
          cookie: context.req.headers.cookie,
        },
      }
    );

    if (response.status === 200) {
      // Handle successful response from the server-side route
      // You can perform additional logic here if needed
      return {
        redirect: {
          destination: "/admin/uploadbook",
          permanent: false,
        },
      };
    } else if (response.status === 401) {
      // Redirect the user to the home directory if status code is not 200
      return { props: {} };
    }
  } catch (error) {
    // Handle error if the request to the server-side route fails

    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
}
