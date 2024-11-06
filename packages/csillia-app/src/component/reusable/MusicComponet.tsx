import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { IoMdMusicalNote } from "react-icons/io";

function MusicComponent() {
  const music = [
    { author: "Evert Steube", title: "Waves", url: " Waves.mp3" },
    { author: "Gertie Neumann", title: "Lofi", url: "Lofi.mp3" },
    { author: "Amadeus Mozart", title: "Piano", url: " Mozart.mp3" },
    { author: "André Rieu", title: "Ode of joy", url: "OdeOfJoy.mp3" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [song, selected_songs] = useState<any>(music[0]);

  return (
    <>
      <div className="w-full flex justify-end ">
        <div className="relative">
          <div
            className={`${
              isOpen ? "absolute" : "hidden"
            }  right-8 -bottom-56  h-52 w-60 rounded-md bg-main  shadow z-10`}
          >
            <div className="relative w-full h-full">
              <div className="w-full border-b-2 border-b-text-main p-2">
                <h1 className="p2">{song.title}</h1>
                <h1 className="p3">{song.author}</h1>
              </div>
              <div className="grid h-20 grid-cols-3 flex-1 overflow-y-auto">
                {music.map((i: any, idx: number) => (
                  <div
                    className="col-start-2"
                    key={idx}
                    onClick={() => {
                      selected_songs(music[idx]);
                    }}
                  >
                    <h1 className="p2">{i.title}</h1>
                    <p className="p3">{i.author}</p>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 flex w-full items-center justify-center border-t-2 border-b-text-main p-2">
                <ReactAudioPlayer src={`/music/${song.url}`} controls />
              </div>
            </div>
          </div>
          <div className="circle bg-primary200 cursor-pointer">
            <IoMdMusicalNote
              size="1.5em"
              className="text-white"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default MusicComponent;
