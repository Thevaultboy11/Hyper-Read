import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ReadingForm from "./readingComponent/ReadingForm";
import { usePagesContext } from "../context/pagesContext";
const Footer = ({ next_page, prev_page }: any) => {
  const { handle_wpm, handle_chunk } = usePagesContext();
  return (
    <div className="fixed bottom-0 flex w-screen items-end justify-center gap-x-4 bg-white p-2">
      <AiFillCaretLeft
        className="cursor-pointer text-3xl"
        onClick={next_page}
      />
      <ReadingForm handle_wpm={handle_wpm} handle_chunk={handle_chunk} />
      <AiFillCaretRight
        className="cursor-pointer text-3xl"
        onClick={prev_page}
      />
    </div>
  );
};

export default Footer;
