import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get_all_admin_books } from "../../routes/books/admin/get_admin_books";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { delete_personal_book } from "../../routes/books/delete_personal_book";
import DeleteAdminBookModal from "../readingComponent/DeleteAdminBookPopup";

function ListPublicBooks() {
  const queryClient = useQueryClient();
  const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [DeleteModalData, setDeleteModalData] = useState(false);
  const { isLoading, isFetched, error, data } = useQuery({
    queryKey: ["books/admin"],
    queryFn: async () => {
      return await get_all_admin_books();
    },
  });

  const deleteBook = async (item: any) => {
    setDeleteModalIsOpen(true);
    setDeleteModalData(item);
  };
  let el = null;
  if (isLoading) {
    el = <div>Loading...</div>;
  }

  if (error) {
    el = <div>Error:</div>;
  }

  if (isFetched) {
    if (data?.data == undefined) {
      return;
    }

    el = (
      <>
        <DeleteAdminBookModal
          isOpen={DeleteModalIsOpen}
          DeleteModalData={DeleteModalData}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Total Pages</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item: any, key: number) => {
                const { id, title, author, fileName, totalPages } = item;
                return (
                  <TableRow key={key}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{author}</TableCell>
                    <TableCell>{fileName}</TableCell>
                    <TableCell>{totalPages}</TableCell>
                    <TableCell>
                      <div className="z-12 h5 flex h-10  w-10  cursor-pointer items-center justify-center rounded-full bg-red-400 ">
                        <BsFillTrash3Fill
                          className="text-white"
                          size="1em"
                          onClick={() => {
                            deleteBook(item);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  return (
    <div className="min-h-96 col-span-12 rounded-xl bg-white p-8">
      <h1 className="h5  my-4">Library books</h1>
      {el}
    </div>
  );
}
export default ListPublicBooks;
