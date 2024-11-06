import React, { useState } from "react";
import SpeedReader from "./SpeedReader";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { FaPlay, FaStop } from "react-icons/fa";
import { BsPlay } from "react-icons/bs";
import { AiOutlinePause } from "react-icons/ai";
import { Paper } from "@mui/material";
import TimeUntilBreak from "./TimeUntillBreak";
import ReadingForm from "./ReadingForm";
import { Slider } from "@mui/material";
import ReadingScrollComponent from "./ReadingScrollComponent";
import SliderComponent from "./SliderComponent";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
interface MyProps {
  page: any;
  currentPage: number;
  lastPage: number;
  handlePreviousPage: any;
  handleNextPage: any;
  movePage: any;
  bookId: number;
  setCurrentWord: any;
  title: string;
}

const ReadingComponentText = ({
  currentPage,
  lastPage,
  page,
  handlePreviousPage,
  handleNextPage,
  movePage,
  bookId,
  setCurrentWord,
}: MyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(250);
  const [resetTs, setResetTs] = useState<any>();

  const renderReader = (props: any, state: any) => {
    if (!state.currentText)
      return <span className="h-12 inline-block">&nbsp;</span>;

    if (props.chunk > 1)
      return <span className="h-12 inline-block">{state.currentText}</span>;

    const fixedLeftStyles =
      "absolute inline-block -translate-x-full text-right h1";

    return (
      <span className="relative">
        <span className={fixedLeftStyles}>{state.pre}</span>
        <span className="text-primary200 h1">{state.mid}</span>
        <span className="absolute h1">{state.post}</span>
      </span>
    );
  };
  const reset = () => {
    setResetTs(new Date().getTime());
  };
  return (
    <>
      <Paper className="my-8 relative flex w-full flex-col items-center  justify-center  p-8 md:h-1/2">
        <div className="flex w-full justify-start gap-x-4">
          <MdOutlineKeyboardArrowLeft
            size="2em"
            onClick={() => {
              handlePreviousPage();
              setIsPlaying(false);
              reset();
            }}
            className="text-xl cursor-pointer hover:text-primary200"
          />
          <MdOutlineKeyboardArrowRight
            size="2em"
            onClick={() => {
              setIsPlaying(false);
              handleNextPage();
              reset();
            }}
            className="text-xl cursor-pointer hover:text-primary200"
          />
        </div>
        <div className="flex w-full flex-col gap-y-6 items-center justify-center p-4 min-h-fit">
          <SpeedReader
            renderReader={renderReader}
            inputText={page || ""}
            speed={wpm}
            isPlaying={isPlaying}
            setCurrentWord={setCurrentWord}
            hasEndedCallback={async () => {
              handleNextPage();
              reset();
            }}
            reset={resetTs}
            trim={{ regex: /\.|,|\?|!/ }}
            offset={{ regex: /\.|,|\?|!/, duration: 0.5 }}
            blank={{ regex: /\.|\?|!/, duration: 0.5 }}
          />{" "}
          <ReadingForm handle_wpm={setWpm} />
          <button
            className="p-4 rounded-full bg-danger200"
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? (
              <AiOutlinePause className="text-white h1" />
            ) : (
              <BsPlay className="text-white h1" />
            )}
          </button>
        </div>
        <div className="w-full">
          <SliderComponent
            bookId={bookId}
            lastPage={lastPage}
            currentPage={currentPage}
            movePage={movePage}
            reset={reset}
          />
        </div>
        <div className="w-full flex justify-between items-center p-4">
          <p className="font-bold">
            Page: {currentPage}/{lastPage}
          </p>
          <TimeUntilBreak />
        </div>
      </Paper>
    </>
  );
};

export default ReadingComponentText;
