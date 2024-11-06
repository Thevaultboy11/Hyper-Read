import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EditBookSchema } from "../../schema/edit_book_schema";
import { GrClose } from "react-icons/gr";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

function EditOneBook({
  title,
  changeFileData,
  author,
  file,
  removeFile,
  id,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, control, reset } = useForm({
    resolver: yupResolver(EditBookSchema),
    defaultValues: {
      title: title,
      author: author,
    },
  });

  const onSubmit = async (data: any) => {
    changeFileData(data, id);
    setIsEditing(false);
  };

  const onError = (err: any) => {
    console.log(err);
  };
  return (
    <form
      className="col-span-12 row border-b-2 border-gray-200 pb-4"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {isEditing ? (
        <>
          <div className="col-span-3">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  className="h-full w-full rounded-md border border-gray-200 p-4"
                  id="title"
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-span-3">
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <input
                  className="h-full w-full rounded-md border border-gray-200 p-4"
                  id="author"
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-span-3">{file.name}</div>
        </>
      ) : (
        <>
          <div className="col-span-3">{title}</div>
          <div className="col-span-3">{author}</div>
          <div className="col-span-3">{file.name}</div>
        </>
      )}
      <div className="col-span-3 flex items-center justify-end gap-x-4">
        <div className="z-12 h5 flex h-10  w-10  cursor-pointer items-center justify-center rounded-full bg-red-400 ">
          {isEditing ? (
            <GrClose
              className="text-white"
              size="1em"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            />
          ) : (
            <BsFillTrash3Fill
              className="text-white"
              size="1em"
              onClick={() => {
                removeFile(id);
                reset();
              }}
            />
          )}
        </div>
        <div className="z-12 h5 flex h-10  w-10  cursor-pointer items-center justify-center rounded-full bg-primary200 ">
          {!isEditing ? (
            <BsFillPencilFill
              className="text-white"
              size="1em"
              onClick={() => {
                reset();
                setIsEditing(!isEditing);
              }}
            />
          ) : (
            <button type="submit" id="submitButton">
              <AiOutlineCheck className="text-white" size="1em" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default EditOneBook;
