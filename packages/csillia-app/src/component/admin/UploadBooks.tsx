import React, { useState, useCallback } from "react";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import EditOneBook from "./EditOneBook";
import { post_admin_book } from "../../routes/books/admin/upload_admin_ library_books";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarContext } from "../../context/snackbarContext";

function UploadBooks() {
  const [filesData, setFilesData] = useState<any>([]);
  const queryClient = useQueryClient();
  const { showSucsses, showError } = useSnackbarContext();

  const handleFileDataChange = (event) => {
    const newFiles = [...event.target.files];

    const filesArray = newFiles.map((file: any) => ({
      file: file,
      title: file.name || "No title",
      author: "Anonymous",
    }));
    setFilesData((prevFiles) => [...prevFiles, ...filesArray]);
  };
  const changeFileData = (data: any, id: number) => {
    setFilesData((prevFiles: any) => {
      // Find the file object with the specified ID and update its title and author
      const updatedFiles = prevFiles.map((file, idx) => {
        if (idx === id) {
          return {
            ...file,
            title: data.title,
            author: data.author,
          };
        } else {
          return file;
        }
      });

      return updatedFiles;
    });
  };
  const removeFile = (indexToRemove) => {
    setFilesData((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };
  return (
    <div className="col-span-12 flex min-h-96 flex-col rounded-xl bg-white p-8">
      <div className="flex w-full items-center justify-between pb-4">
        <h3 className="text-lg font-medium">Selected Files:</h3>
        <div
          onClick={async () => {
            if (filesData.length != 0) {
              const res = await Promise.all(
                filesData.map(
                  async (book: any, index: number, array: any[]) => {
                    const formData = new FormData();
                    formData.append(`books`, book.file);
                    formData.append("title", book.title);
                    formData.append("author", book.author);
                    const res = await post_admin_book(formData);
                    if (res?.status != 200) {
                      return res;
                    } else {
                      if (array.length == index + 1) {
                        return res;
                      }
                    }
                  }
                )
              );
              // Invalidate the query
              if (res.every((result) => result && result.status == 200)) {
                setFilesData([]);
                showSucsses("Books successfully uploaded!");
                queryClient.invalidateQueries({
                  exact: true,
                  queryKey: ["books/admin"],
                });
              } else {
                showError("There was an error in uploading");
              }
            }
          }}
          className="z-12 h5 flex h-12  w-12  cursor-pointer items-center justify-center rounded-full bg-primary200 text-white"
        >
          <AiOutlinePlus size="1.5em" />
        </div>
      </div>
      <div
        className="flex-1  rounded-lg border border-gray-300 p-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const newFiles = [...e.dataTransfer.files];
          const filesArray = newFiles.map((file: any) => ({
            file,
            title: file.name || "No title",
            author: "Anonymous",
          }));
          setFilesData((prevFiles) => [...prevFiles, ...filesArray]);
        }}
      >
        {filesData.length === 0 ? (
          <label htmlFor="file-upload" className="cursor-pointer text-gray-500">
            Drag and drop multiple PDF files here, or click to select files.
          </label>
        ) : (
          <div className="row">
            <p className="h5 col-span-3">Title</p>
            <p className="h5 col-span-3">Author</p>
            <p className="h5 col-span-3">File</p>

            {filesData.map((file, index) => {
              return (
                <EditOneBook
                  changeFileData={changeFileData}
                  removeFile={removeFile}
                  key={index}
                  file={file.file}
                  id={index}
                  author={file.author}
                  title={file.title}
                />
              );
            })}
          </div>
        )}

        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileDataChange}
          style={{ display: "none" }}
        />

        {filesData === 0 ? null : (
          <label
            htmlFor="file-upload"
            className="mt-2 cursor-pointer text-sm text-gray-500"
          >
            {filesData.length} file{filesData.length > 1 ? "s" : ""} selected
          </label>
        )}
      </div>
    </div>
  );
}

export default UploadBooks;
