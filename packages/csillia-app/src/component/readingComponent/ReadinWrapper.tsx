import React, { useEffect, useState } from "react";
import { get_pages } from "../../routes/books/pages";
import { set_personal_last_page } from "../../routes/books/set_personal_last_page";
import ReactWordProvider from "./ReactWordProvider";
import useRenderCount from "../../lib/isReRendered";
function ReadingWrapper({ bookId, currentPage, setBookId }: any) {
  const [pageIndex, setPageIndex] = useState<any>();
  const isReRendered = useRenderCount();
  const [bookData, setBookData] = useState<any>(undefined);
  const { title, pages, totalPages } = bookData || {};
  const keys = Object.keys(pages || []);
  const endIndex = keys[keys.length - 1] as any;
  const startIndex = Number(keys[0]);
  useEffect(() => {
    async function fetchBookData() {
      const response = await get_pages(bookId, currentPage, currentPage + 10);
      setBookData(response.data);
      setPageIndex(response.data.currentPage);
    }

    fetchBookData();
  }, [bookId, currentPage]);
  const change_pages = (PagesPromise: any) => {
    setBookData({
      ...bookData,
      pages: Object.assign(bookData.pages, PagesPromise.data.pages),
    });
  };
  const handlePreviousPage = async () => {
    if (pageIndex <= 0) {
      return;
    }
    if (pageIndex <= startIndex) {
      let array;
      if (startIndex <= 10) {
        array = await get_pages(bookId, 0, startIndex);
      } else {
        array = await get_pages(bookId, startIndex - 10, startIndex);
      }
      change_pages(array);
      setPageIndex(pageIndex - 1);
    } else {
      await set_personal_last_page(bookId, startIndex);
      setPageIndex(pageIndex - 1);
    }
  };

  const movePage = async (page: number) => {
    setBookId({ bookId: bookId, currentPage: page });
  };
  const handleNextPage = async () => {
    if (totalPages == pageIndex) {
      return;
    }

    if (pageIndex >= endIndex) {
      let array;
      if (pageIndex + 10 >= totalPages) {
        array = await get_pages(bookId, pageIndex, totalPages);
      } else {
        array = await get_pages(bookId, pageIndex, pageIndex + 10);
      }
      change_pages(array);

      setPageIndex(pageIndex + 1);
    } else {
      await set_personal_last_page(bookId, pageIndex);
      setPageIndex(pageIndex + 1);
    }
  };

  if (typeof bookData != "undefined") {
    return (
      <div className="w-full h-full flex justify-center flex-col gap-y-4">
        <ReactWordProvider
          title={title}
          bookData={pages}
          bookId={bookId}
          pageIndex={pageIndex}
          movePage={movePage}
          pageLast={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    );
  }
  return <div className="">Loading</div>;
}

export default ReadingWrapper;
