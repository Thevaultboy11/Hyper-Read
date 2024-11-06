import React, { useState } from "react";
import Slider from "../reusable/CuraselComponent";
import { get_personal_books } from "../../routes/books/get_personal_books";
import { FaBook } from "react-icons/fa";
import { BsBookmarkDashFill } from "react-icons/bs";
import { delete_personal_book } from "../../routes/books/delete_personal_book";
import { queryClient } from "../../pages/_app";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { delete_library_book } from "../../routes/books/public/delete_library_book";
function SplitSlider(array: any) {
  if (array.length <= 4) {
    return [array];
  } else {
    const result = [];
    let startIndex = 0;
    while (startIndex < array.length) {
      result.push(array.slice(startIndex, startIndex + 4));
      startIndex += 4;
    }
    return result;
  }
}
function LibrarySelect({
  selectBook,
  userBooks,
  setDeleteModalIsOpen,
  setDeleteModalData,
}: any) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  if (typeof userBooks === "undefined") {
    return (
      <div className="p-8 w-full flex justify-center items-center">
        <div className="h5">
          Save your favorite book{" "}
          <span
            className="text-primary200 underline cursor-pointer"
            onClick={() => {
              router.push("/library");
            }}
          >
            here
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <Slider index={index} setIndex={setIndex} data={SplitSlider(userBooks)}>
        {SplitSlider(userBooks).map((book: any[], idx: number) => (
          <div key={idx} className="slide">
            {book.map((i: any) => (
              <div key={i.id} className="w-full">
                <div className="grid grid-cols-12 w-full hover:bg-gray-200 rounded-xl mt-2 px-4 py-2">
                  <FaBook
                    onClick={() => {
                      selectBook({
                        bookId: i.id,
                        currentPage: i.currentPage,
                        totalPages: i.totalPages,
                      });
                    }}
                    className="col-span-2 cursor-pointer  self-center h3 text-primary200"
                  />
                  <div className="flex gap-x-12 items-center justify-start col-span-4">
                    <p className="p1">{i.title}</p>
                    <p className="p1">
                      {" "}
                      Page: {i.currentPage}/{i.totalPages}
                    </p>
                  </div>
                  <div className="col-span-6 flex justify-end items-end">
                    <div className="z-12 h5 flex h-10  w-10  cursor-pointer items-center justify-center rounded-full bg-primary200 ">
                      <BsBookmarkDashFill
                        className="text-white"
                        size="1em"
                        onClick={async () => {
                          setDeleteModalIsOpen(true);
                          setDeleteModalData({
                            title: i.title,
                            id: i.id,
                            isPublicBook: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}{" "}
      </Slider>
    </>
  );
}

export default LibrarySelect;
