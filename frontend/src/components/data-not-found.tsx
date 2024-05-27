import XCircleIcon from "@/icons/x-circle";

interface Props {
  search?: string;
}

export default function DataNotFound({ search }: Props) {
  return (
    <div className="flex flex-col items-center">
      <XCircleIcon className="h-12 w-12 text-red-700" />

      <div className="mt-2">
        <div className="text-center text-[22px] text-red-700">
          Sorry, no results found for your search.
        </div>
        {search && (
          <div className="mt-[3px] block text-center text-[20px] font-normal text-zinc-500 max-[768px]:text-[16px]">
            {search}
          </div>
        )}
      </div>
    </div>
  );
}
