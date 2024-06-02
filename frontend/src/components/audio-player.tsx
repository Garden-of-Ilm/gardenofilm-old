import React, { useEffect, useRef, useState } from "react";

import { calculateDurationInMinutes } from "@/lib/utils";

import { Pause, Play } from "lucide-react";

const audioPlaybackRates = [
  {
    label: "1x",
    value: 1,
  },
  {
    label: "1.5x",
    value: 1.5,
  },
  {
    label: "2x",
    value: 2,
  },
];

export default function AudioPlayer({ url }: { url: string }) {
  const [selectedPlaybackRate, setSelectedPlaybackRate] = useState(
    audioPlaybackRates[0],
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangePlaybackRate = () => {
    const currentIndex = audioPlaybackRates.findIndex(
      (rate) => rate.value === selectedPlaybackRate.value,
    );
    const nextIndex = (currentIndex + 1) % audioPlaybackRates.length; // Circular loop
    const newPlaybackRate = audioPlaybackRates[nextIndex];

    if (audioRef.current) {
      audioRef.current.playbackRate = newPlaybackRate.value;
    }

    setSelectedPlaybackRate(newPlaybackRate);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = event.currentTarget;
      const clickX = event.clientX - progressBar.getBoundingClientRect().left;
      const newTime =
        (clickX / progressBar.clientWidth) * audioRef.current.duration;

      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const updateProgressBar = () => {
      if (audioRef.current) {
        if (audioRef.current?.currentTime === audioRef.current?.duration) {
          setIsPaused(true);
        }
        const width =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgressBarWidth(isNaN(width) ? 0 : width);
      }
    };

    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    audioRef.current?.addEventListener("timeupdate", updateProgressBar);
    audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgressBar);
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
    };
  }, []);

  return (
    <div className="mx-auto mt-[24px] flex max-w-md items-center rounded-xl border border-zinc-300 bg-white px-[12px] py-[14px] shadow">
      <button onClick={handlePlay} type="button" disabled={isLoading}>
        {isPaused ? (
          <Play className="h-6 w-6" fill="#000" stroke="2" />
        ) : (
          <Pause className="h-6 w-6" fill="#000" stroke="2" />
        )}
      </button>

      <div className="w-[100px] p-1 text-center text-sm">
        {isLoading && "Loading..."}
        {!isLoading && audioRef.current?.duration && (
          <div>
            <span className="text-black">
              {calculateDurationInMinutes(audioRef.current?.currentTime)}
            </span>
            <span className="text-zinc-300"> / </span>
            <span className="text-[#656565]">
              {calculateDurationInMinutes(audioRef.current?.duration)}
            </span>
          </div>
        )}
      </div>

      <div
        className="relative mx-1 mr-3 h-[1px] grow cursor-pointer bg-[#dfdfdf]"
        onClick={handleTimelineClick}
      >
        <span
          className="absolute left-0 top-[-1.1px] inline-block h-[3px] bg-black before:absolute before:right-0 before:mr-[-3px] before:mt-[-3px] before:h-[9px] before:w-[9px] before:rounded-[50%] before:bg-black"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      <button
        disabled={isLoading}
        onClick={handleChangePlaybackRate}
        className="w-[45px] rounded-md border border-[#d5d5d5] bg-[#ededed] py-[2px] text-center font-mono text-sm"
      >
        <span>{selectedPlaybackRate.label}</span>
      </button>

      <audio className="hidden" ref={audioRef} src={url} />
    </div>
  );
}
