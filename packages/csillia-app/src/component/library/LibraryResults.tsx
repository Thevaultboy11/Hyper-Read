import { useQuery } from "@tanstack/react-query";
import { get_library_books } from "../../routes/books/public/get_library_search_books";
import SelectOneBook from "./SelectOneBook";
import { useSession } from "next-auth/react";
function LibraryResults({ book_name }) {
  const { data, isLoading, isError, isIdle, isSuccess, status } = useQuery({
    queryKey: ["library/public", book_name],
    queryFn: () => get_library_books(book_name),
    enabled: book_name !== "", // disable query if search is empty
  });

  let el = null;

  if (isError) {
    el = (
      <div className="flex h-full w-full items-center justify-center">
        <p className="h4">Error while fetching books data</p>
      </div>
    );
  }
  if (typeof data == "undefined") {
    el = (
      <div className="flex h-full w-full items-center justify-center">
        <p className="h4">Please enter a book name to search</p>
      </div>
    );
  }

  if (isSuccess && data.data === "No books found!") {
    el = (
      <div className="flex h-full w-full items-center justify-center">
        <p className="h4">No books found for '{book_name}'</p>
      </div>
    );
  } else if (isSuccess && data.data !== "No books found!") {
    el = (
      <div className="flex h-full w-full items-start justify-center">
        <div className="flex flex-1 flex-col  gap-y-4 overflow-y-auto px-4">
          {data?.data.map((i: any, idx: number) => (
            <SelectOneBook key={idx} file={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ minHeight: "400px" }}
      className="col-span-12 flex  flex-col rounded-xl bg-white p-8"
    >
      <div className="flex items-center justify-center">
        <h1>Books</h1>
      </div>
      {el}
    </div>
  );
}

export default LibraryResults;
