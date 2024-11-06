import React, { useState } from "react";
import Slider from "../reusable/CuraselComponent";
import { get_personal_books } from "../../routes/books/get_personal_books";
import { useQuery } from "@tanstack/react-query";
import { FaBook } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { delete_personal_book } from "../../routes/books/delete_personal_book";
import LibrarySelect from "./LibrarySelect";
import PersonalSelect from "./PersonalSelect";
import DeleteBookModal from "./DeleteBookPopup";
import { useSession } from "next-auth/react";
function FilterResponse(responseArray: any[]) {
  let public0 = [];
  let public1 = [];

  responseArray.forEach((item) => {
    if (item.public === 0) {
      public0.push(item);
    } else if (item.public === 1) {
      public1.push(item);
    }
  });

  if (public0.length === 0 && public1.length === 0) {
    return [];
  } else {
    return [public0, public1];
  }
}

function SplitSlider(array: any) {
  if (array.length <= 4) {
    return [array];
  } else {
    const result = [[], []];
    for (let i = 0; i < array.length; i += 4) {
      result.push(array.slice(i, i + 4));
    }
    return result;
  }
}
function UserBookAll({ selectBook }: any) {
  const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [DeleteModalData, setDeleteModalData] = useState(false);
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const {
    data: booksRes,
    isError,
    isFetched,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: [`books/all/user/${userID}`],
    queryFn: async () => get_personal_books(),
  });

  let el = (
    <div className="flex h-64 items-center justify-center">
      <div className="spinner h-16 w-16 rotate-45 border-4 border-t-4 bg-secondary200"></div>
    </div>
  );

  if (isFetching) {
    el = (
      <div className="p2">
        <p>Loading..</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col-span-1">
        <h1>Error in fetching the books</h1>
      </div>
    );
  }
  if (isSuccess) {
    if (booksRes.data == undefined) {
      el = (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-xl">Go to our library page to select a book</p>
        </div>
      );
    } else {
      const userBooks = FilterResponse(booksRes?.data);

      el = (
        <>
          <DeleteBookModal
            isOpen={DeleteModalIsOpen}
            DeleteModalData={DeleteModalData}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
          />
          <h1 className="w-full border-b-4 pb-4 border-b-gray-200">
            Library books
          </h1>
          <LibrarySelect
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            setDeleteModalData={setDeleteModalData}
            selectBook={selectBook}
            userBooks={userBooks[1]}
          />
          <h1 className="w-full border-b-4 pb-4 border-b-gray-200">
            Your books
          </h1>
          <PersonalSelect
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            setDeleteModalData={setDeleteModalData}
            selectBook={selectBook}
            userBooks={userBooks[0]}
          />
        </>
      );
    }
  }

  return <div>{el}</div>;
}

export default UserBookAll;
