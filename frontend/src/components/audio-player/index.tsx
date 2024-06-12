import React, {useEffect, useRef, useState} from "react";
import styles from "./audio-player.module.css";
import {Audio} from "@/api/fatwa-res";
import {PauseIcon, PlayIcon} from "@/icons";

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

function AudioPlayer(props: Audio) {
  const { duration, url } = props;
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

  function calculateDurationInMinutes(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className={styles.audioWrapper}>
      <div className={styles.audioPlayer}>
        <button onClick={handlePlay} type="button" disabled={isLoading}>
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <div
          onClick={handleTimelineClick}
          className={styles.audioPlayerProgressBar}
        >
          <span style={{ width: `${progressBarWidth}%` }} />
        </div>
        <button
          disabled={isLoading}
          onClick={handleChangePlaybackRate}
          className={styles.audioPlaybackRateBtn}
        >
          <span>{selectedPlaybackRate.label}</span>
        </button>
      </div>
      <div className={styles.audioWrapperTimeLine}>
        {isLoading && "Loading..."}
        {!isLoading && audioRef.current?.duration && (
            <>
              {calculateDurationInMinutes(audioRef.current?.currentTime)}
              <span> / </span>
              {calculateDurationInMinutes(audioRef.current?.duration)}
            </>
        )}

      </div>
      <audio ref={audioRef} src={url} />
    </div>
  );
}

export default AudioPlayer;
