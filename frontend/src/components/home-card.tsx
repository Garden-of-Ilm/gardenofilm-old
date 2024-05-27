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

export default function HomeCard({
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
      className="flex cursor-pointer flex-col justify-between rounded-lg border border-slate-300/80 bg-white px-[18px] pt-[16px] shadow hover:border-slate-500 hover:shadow-md md:min-h-[150px]"
    >
      <div className="text-sm font-medium tracking-tight text-[rgba(0_0_0_0.8)]">
        {title}
      </div>
      <div className="mt-[24px] items-center justify-between text-[10px]">
        <span className="text-md truncate text-[#000000cc]">{author}</span>
        <div className="text-[#00000080]">{formatDate(createdAt)}</div>
      </div>
      <div className="mb-3 mt-2.5 flex w-full items-center">
        <div className="w-2/3">
          {category && (
            <Badge variant="outline" className="border-slate-400/70">
              {category}
            </Badge>
          )}
        </div>
        <div className="w-1/3 text-right text-sm text-slate-600">
          {views} views
        </div>
      </div>
    </div>
  );
}
