import React, {useEffect, useRef, useState} from "react";
import styles from "./audio-card.module.css";
import {CompletedIcon, DeleteIcon} from "@/icons";
import LoadingIcon from "@/icons/loading.icon";
import {formatAudioSize} from "@/utils/number";

interface FileType extends File {
  url?: string;
  filename: string;
}

interface Props {
  audio?: FileType;
  completed: number;
  loading: boolean;
  index: number;
  handleRemoveAudio: Function;
}

function AudioCard({audio, completed, index, loading, handleRemoveAudio}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setAudioDuration(audioRef.current.duration);
      }
    };

    audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audio]);

  const audioSize = audio?.size ?? 1;
  const audioSizeReadable = formatAudioSize(audioSize);
  const progressPercentage = completed > 0 ? Math.min(100, completed) : 0;
  const audioSizeOfLoader = formatAudioSize(
      (progressPercentage / 100) * audioSize,
  );

  const isLoading = loading;
  const audioUrl = audio?.url;

  function calculateDurationInMinutes(duration?: number) {
    if (!duration) return;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const progressBarWidth = audio?.url && !loading ? "100%" : `${progressPercentage}%`;

  return (
      <div className={styles.audioCardWrapper}>
        <div className={styles.audioCardTopSide}>
          <div className={styles.audioCardTopLeftSide}>
            <h4 className="max-w-[230px] truncate">
              {audio?.name ?? audio?.filename}
            </h4>
            <div className={styles.audioCardTopLeftSideInfo}>
            <span>
              {loading && `${audioSizeOfLoader} of `}
              {audioSizeReadable} •
            </span>
              <p>{isLoading ? <LoadingIcon/> : <CompletedIcon/>}</p>
              {!audio?.url && (
                  <span>{progressPercentage === 100 ? "" : "Uploading..."}</span>
              )}
              <span>{calculateDurationInMinutes(audioDuration)}</span>
            </div>
          </div>
          {!isLoading && (
              <button
                  type="button"
                  className={styles.audioCardTopRightSideDeleteBtn}
                  onClick={() => handleRemoveAudio()}
              >
                <DeleteIcon/>
              </button>
          )}
        </div>
        <div className={styles.audioProgressBar}>
          <div
              className={styles.audioProgressBarLine}
              style={{width: progressBarWidth}}
          />
        </div>
        <audio
            src={audioUrl}
            ref={audioRef}
            className={"hidden"}
        />
      </div>
  );
}

export default AudioCard;
