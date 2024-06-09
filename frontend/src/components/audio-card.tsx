import React, { useEffect, useRef, useState } from "react";
import { formatAudioSize } from "@/lib/utils";
import { calculateDurationInMinutes } from "@/lib/utils";
import { CircleArrowUp, CircleCheck, CircleMinus } from "lucide-react";

interface FileType extends File {
  url?: string;
  filename: string;
}

interface Props {
  audio?: FileType;
  completed: number;
  loading: boolean;
  handleRemoveAudio: Function;
}

export default function AudioCard({
  audio,
  completed,
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
    <div className="mt-4 w-full max-w-sm rounded-xl border border-slate-400 bg-white p-4">
      <div className="flex justify-between space-x-2">
        <div>
          <h4 className="text-sm font-medium">
            {audio?.name ?? audio?.filename}
          </h4>
          <div className="mt-[8px] flex items-center gap-2.5 text-[12px] text-gray-500">
            <span>
              {loading && `${audioSizeOfLoader} of`}
              {audioSizeReadable}
            </span>
            <p>
              {isLoading ? (
                <CircleArrowUp className="h-5 w-5" />
              ) : (
                <CircleCheck className="h-5 w-5 text-green-600" />
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
            className="flex h-fit w-fit items-center justify-center rounded-3xl border border-red-200 border-white bg-white p-1.5 hover:border-red-300"
            onClick={() => handleRemoveAudio()}
          >
            <CircleMinus className="h-6 w-6 text-red-500" />
          </button>
        )}
      </div>
      <div className="relative mt-[10px] h-[4px] w-[100%] rounded-[4px] bg-[#f3f1f8]">
        <div
          className="h-[4px] w-[40%] rounded-[4px] bg-[#6690a8]"
          style={{ width: progressBarWidth }}
        />
      </div>
      <audio src={audioUrl} ref={audioRef} className={"hidden"} />
    </div>
  );
}
