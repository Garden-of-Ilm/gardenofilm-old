import React, { useEffect, useRef, useState } from "react";
import { formatAudioSize } from "@/lib/utils";
import { calculateDurationInMinutes } from "@/lib/utils";
import TrashIcon from "@/icons/trash";
import CheckCircleIcon from "@/icons/check-circle";
import ArrowUpCircleIcon from "@/icons/arrow-up-circle";

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

export default function AudioCard({
  audio,
  completed,
  index,
  loading,
  handleRemoveAudio,
}: Props) {
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
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
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

  const progressBarWidth =
    audio?.url && !loading ? "100%" : `${progressPercentage}%`;

  return (
    <div className="mt-4 rounded-xl border border-[#dfcebd] bg-[#e9ded3] p-4">
      <div className="flex justify-between">
        <div>
          <h4 className="max-w-[230px] truncate text-sm font-medium text-[#4e3e2f]">
            {audio?.name ?? audio?.filename}
          </h4>
          <div className="mt-[8px] flex items-center gap-2.5 text-[12px] text-[#836950]">
            <span>
              {loading && `${audioSizeOfLoader} of `}
              {audioSizeReadable} •
            </span>
            <p>
              {isLoading ? (
                <ArrowUpCircleIcon className="h-5 w-5" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              )}
            </p>
            {!audio?.url && (
              <span>{progressPercentage === 100 ? "" : "Uploading..."}</span>
            )}
            <span>{calculateDurationInMinutes(audioDuration)}</span>
          </div>
        </div>
        {!isLoading && (
          <button
            type="button"
            className="flex h-[32px] w-[32px] items-center justify-center rounded-2xl bg-white"
            onClick={() => handleRemoveAudio()}
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        )}
      </div>
      <div className="relative mt-[10px] h-[4px] w-[100%] rounded-[4px] bg-[#f8f4f1]">
        <div
          className="h-[4px] w-[40%] rounded-[4px] bg-[#a88766]"
          style={{ width: progressBarWidth }}
        />
      </div>
      <audio src={audioUrl} ref={audioRef} className={"hidden"} />
    </div>
  );
}
