import React, { memo, useState } from "react";
import ReadingScrollComponent from "./ReadingScrollComponent";
import ReadingComponentText from "./ReadingComponentText";
import useRenderCount from "../../lib/isReRendered";
const MemoizedReadingComponentText = memo(
  ReadingComponentText,
  (prevProps: any, nextProps: any) => prevProps.page === nextProps.page
);

function CurrentWordProvider({
  bookData,
  bookId,
  pageIndex,
  movePage,
  pageLast,
  handlePreviousPage,
  handleNextPage,
  title,
}: any) {
  const [currentWord, setCurrentWord] = useState<any>();
  const isReRendered = useRenderCount();
  let data = ["No page"];
  if (typeof bookData !== "undefined") {
    if (pageLast == pageIndex) {
      data = "End of the book";
    } else {
      data = bookData[pageIndex];
    }
  }
  return (
    <div>
      <ReadingScrollComponent
        words={currentWord?.words || data.split("")}
        index={currentWord?.current || 0}
      />
      <MemoizedReadingComponentText
        title={title}
        setCurrentWord={setCurrentWord}
        bookId={bookId}
        movePage={movePage}
        page={data}
        currentPage={pageIndex}
        lastPage={pageLast}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
export default CurrentWordProvider;
