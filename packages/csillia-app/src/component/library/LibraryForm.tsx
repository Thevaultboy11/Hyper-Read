import React from "react";
import { useForm, Controller } from "react-hook-form";
import { LibraryStaticData } from "../../schema/library_schema";
import { AiOutlineSearch } from "react-icons/ai";

function LibraryForm({ set_book_name }: any) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: LibraryStaticData,
  });

  const onSubmit = async (data: any) => {
    set_book_name(data.search); // example of handling form submission
  };

  const onError = async (errors) => {
    console.error(errors); // example of handling form errors
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="relative col-span-12 h-12 gap-y-8"
    >
      <button className="z-12 h5 absolute right-0 top-0 flex cursor-pointer  items-center  justify-center rounded-full bg-primary200 p-4 text-white">
        <AiOutlineSearch />
      </button>

      <Controller
        name="search"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }: any) => (
          <>
            <input
              className="h-full w-full rounded-full border border-gray-200 p-4"
              id="search"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              fullWidth
              sx={{ zIndex: 1 }}
              error={Boolean(error?.message)}
            />
          </>
        )}
      />
    </form>
  );
}

export default LibraryForm;
