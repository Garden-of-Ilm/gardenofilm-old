import { formatDate } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface Props {
  title: string;
  author: string;
  createdAt: string;
  category?: string;
  views: number;
  onClick: () => void;
}

export default function Card({
  title,
  author,
  createdAt,
  category,
  views,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer justify-between border border-slate-300/80 bg-white px-[18px] pt-[10px] shadow hover:border-slate-500 hover:shadow-md md:min-h-[150px] md:rounded-lg"
    >
      <div className="flex items-center">
        <div className="grow text-[13px]">{category}</div>
        <div className="text-[12px] text-slate-500">
          {formatDate(createdAt)}
        </div>
      </div>
      <div className="mt-2 min-h-8 text-[13px] font-semibold tracking-tight md:min-h-16">
        {title}
      </div>
      <div className="mt-3 items-center justify-between text-[12px]">
        <span className="text-slate-600">{author}</span>
      </div>
      <div className="mb-3 mt-0.5 text-[12px] text-slate-500/90">
        {views} views
      </div>
    </div>
  );
}
