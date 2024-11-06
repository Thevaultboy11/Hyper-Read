import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { delete_personal_book } from "../../routes/books/delete_personal_book";
import { useQueryClient } from "@tanstack/react-query";
import { delete_library_book } from "../../routes/books/public/delete_library_book";
import { getSession, useSession } from "next-auth/react";

const DeleteBookModal = ({
  isOpen,
  onDelete,
  DeleteModalData,
  setDeleteModalIsOpen,
}: any) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        Are you sure you want to remove {DeleteModalData.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDeleteModalIsOpen(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <button
          onClick={async () => {
            if (DeleteModalData.isPublicBook) {
              await delete_library_book(DeleteModalData.id);
            } else {
              await delete_personal_book(DeleteModalData.id);
            }
            queryClient.invalidateQueries({
              queryKey: [`books/all/user/${userID}`],
            });
            setDeleteModalIsOpen(false);
          }}
          className="danger_btn"
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBookModal;
