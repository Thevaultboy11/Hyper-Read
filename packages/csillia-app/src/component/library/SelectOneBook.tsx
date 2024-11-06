import React, { useState } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { post_book_library } from "../../routes/books/public/post_library_book";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarContext } from "../../context/snackbarContext";
import { useSession } from "next-auth/react";

function SelectOneBook({ file }: any) {
  const { fileName, id, size, title, totalPages } = file || {};
  const [isSelected, setIsSelected] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const { showSucsses, showError } = useSnackbarContext();
  const handleBookmarkClick = async () => {
    setIsSelected(true);
    const res = await post_book_library(id);
    if (res?.status == 200) {
      showSucsses(`Saved the ${title} to the library`);
      queryClient.invalidateQueries({
        queryKey: [`books/all/user/${userID}`],
        exact: true,
      });
    } else if (res?.status == 201) {
      showError("Book already selected");
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-gray-200 pb-4">
      <div className="flex gap-x-4">
        <p>{title}</p>
        <p className="text-gray-400">{totalPages || "A"}</p>
      </div>
      <div onClick={handleBookmarkClick}>
        {isSelected ? (
          <BsFillBookmarkFill className="h5 cursor-pointer text-primary200" />
        ) : (
          <BsBookmark className="h5 cursor-pointer text-primary200" />
        )}
      </div>
    </div>
  );
}

export default SelectOneBook;
