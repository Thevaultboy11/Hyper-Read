import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbarContext } from "../../context/snackbarContext";
import { post_personal_book } from "../../routes/books/upload_personal_book";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { queryClient } from "../../pages/_app";
import MusicComponent from "../reusable/MusicComponet";
import { GrClose } from "react-icons/gr";
import PersonalBooks from "./UserBookAll";
import LibraryBooks from "./LibrarySelect";
import UserBookAll from "./UserBookAll";
import { useSession } from "next-auth/react";
const useStyles = makeStyles((theme) => ({
  content: {
    zIndex: 2,
    height: "70%",
    border: "1px solid rgb(107 114 128)",
    minWidth: "80%",
    [theme.breakpoints.up("sm")]: { minWidth: "50%" },
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
}));

export default function SelectBook({ selectBook }: any) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const classes = useStyles();
  const { showSucsses, showError } = useSnackbarContext();
  const { data: session } = useSession();
  const userID = session?.user?.id || -1;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const submit = async () => {
    const res = await post_personal_book(file, showSucsses);
    if (res?.status == 200) {
      queryClient.invalidateQueries({
        queryKey: [`books/all/user/${userID}`],
        exact: true,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const isPdf = file.type === "application/pdf";

    if (!isPdf) {
      showError("Not a PDF file");
      setFile(null);
      return;
    }
    setFile(file);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleClickOpen}
          className="min-w-max py-2 px-4 rounded-full text-white  bg-primary200"
        >
          Select book
        </button>
        <MusicComponent />
      </div>
      <Dialog open={open} classes={{ paper: classes.content }}>
        <DialogTitle>
          <div className="flex w-full justify-end">
            <GrClose
              className="cursor-pointer"
              size="1.5em"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <UserBookAll selectBook={selectBook} />
        </DialogContent>
        <DialogActions>
          {" "}
          <div className="flex h-full w-full flex-col items-center justify-center justify-self-center">
            <div className="flex gap-x-2">
              {" "}
              <label className="flex cursor-pointer items-center rounded-lg bg-gray-200 p-2 text-gray-700 hover:bg-gray-300">
                <span className="mr-4">
                  {file == null ? "Choose a file" : file?.name}
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <AiOutlineCloudUpload />
              </label>
              <button
                type="submit"
                className="rounded primary_btn md"
                disabled={uploading}
                onClick={() => {
                  submit();
                }}
              >
                Upload{" "}
              </button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
