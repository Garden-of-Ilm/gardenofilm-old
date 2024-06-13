import Link from "next/link";

import clsx from "clsx";

import { Calendar } from "lucide-react";

import { formatDate, formatNumber } from "@/lib/utils";

interface Props {
  title: string;
  author: string;
  createdAt: string;
  category?: string;
  views: number;
  variant?: "1" | "2";
  onClick: () => void;
  href: string;
}

export default function Card({
  title,
  author,
  createdAt,
  category,
  views,
  onClick,
  variant = "1",
  href,
}: Props) {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={clsx(
          "h-full w-full cursor-pointer select-none justify-between border border-slate-400/65 bg-white px-[18px] py-[10px] shadow hover:border-slate-500 md:min-h-[150px]",
          {
            "md:rounded-lg": variant == "1",
            "rounded-lg": variant == "2",
          },
        )}
      >
        <div className="flex items-center">
          <div className="grow text-[14px] md:text-[13px]">
            {category && (
              <div className="w-fit rounded-sm bg-[#b9d4cd] px-2 py-0.5 text-xs font-medium text-[#224943]">
                {category}
              </div>
            )}
          </div>
          <div className="flex items-center text-[13px] text-slate-500 md:text-[12px]">
            <Calendar className="mr-1 inline h-3 w-3" />
            <div>{formatDate(createdAt)}</div>
          </div>
        </div>
        <div className="mt-3 min-h-8 text-[14px] font-semibold tracking-tight md:min-h-16 md:text-[13px]">
          {title}
        </div>
        <div className="mt-3 items-center justify-between text-[13px] md:text-[12px]">
          <span className="text-slate-600">{author}</span>
        </div>
        <div className="mt-0.5 text-[13px] text-slate-500/90 md:text-[12px]">
          {formatNumber(views)} views
        </div>
      </div>
    </Link>
  );
}
