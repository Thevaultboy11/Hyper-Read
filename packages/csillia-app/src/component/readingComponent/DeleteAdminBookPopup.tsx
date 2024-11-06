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

const DeleteAdminBookModal = ({
  isOpen,
  DeleteModalData,
  setDeleteModalIsOpen,
}: any) => {
  const queryClient = useQueryClient();

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
            const res = await delete_personal_book(DeleteModalData.id);

            if (res?.status == 200) {
              queryClient.invalidateQueries({
                queryKey: ["books/admin"],
                exact: true,
              });
              queryClient.invalidateQueries({
                queryKey: ["library/public"],
                exact: true,
              });
            }
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

export default DeleteAdminBookModal;
