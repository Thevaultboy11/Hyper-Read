import { Slider } from "@mui/material";
import { set_personal_last_page } from "../../routes/books/set_personal_last_page";
import React from "react";

const SliderComponent = React.memo(
  ({ movePage, currentPage, reset, bookId, lastPage, ...props }: any) => {
    return (
      <Slider
        onChange={async (e: any) => {
          if (e.target.value > lastPage - 10) {
            setTimeout(() => {
              movePage(lastPage - 10);
              reset();
            }, 2000);
          }
          if (e.type !== "mousedown") {
            return;
          }
          const res = await set_personal_last_page(bookId, e.target.value);
          if (res.status == "200") {
            setTimeout(() => {
              movePage(e.target.value);
              reset();
            }, 2000);
          }
        }}
        sx={{ width: "100%", color: "#049dd9" }}
        value={currentPage}
        step={1}
        max={lastPage}
        {...props}
      />
    );
  },
  (prevProps: any, nextProps: any) => {
    return prevProps.currentPage === nextProps.currentPage;
  }
);

export default SliderComponent;
