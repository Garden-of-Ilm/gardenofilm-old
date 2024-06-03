import { formatDate } from "@/lib/utils";
import clsx from "clsx";

interface Props {
  title: string;
  author: string;
  createdAt: string;
  category?: string;
  views: number;
  variant?: "1" | "2";
  onClick: () => void;
}

export default function Card({
  title,
  author,
  createdAt,
  category,
  views,
  onClick,
  variant = "1",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx({
        "cursor-pointer justify-between border border-slate-300/80 bg-white px-[18px] pt-[10px] shadow hover:border-slate-500 hover:shadow-md md:min-h-[150px] md:rounded-lg":
          variant == "1",
        "cursor-pointer justify-between rounded-lg border border-slate-300/80 bg-white px-[18px] pt-[10px] shadow hover:border-slate-500 hover:shadow-md md:min-h-[150px]":
          variant == "2",
      })}
    >
      <div className="flex items-center">
        <div className="grow text-[14px] md:text-[13px]">{category}</div>
        <div className="text-[13px] text-slate-500 md:text-[12px]">
          {formatDate(createdAt)}
        </div>
      </div>
      <div className="mt-2 min-h-8 text-[14px] font-semibold tracking-tight md:min-h-16 md:text-[13px]">
        {title}
      </div>
      <div className="mt-3 items-center justify-between text-[13px] md:text-[12px]">
        <span className="text-slate-600">{author}</span>
      </div>
      <div className="mb-3 mt-0.5 text-[13px] text-slate-500/90 md:text-[12px]">
        {views} views
      </div>
    </div>
  );
}
