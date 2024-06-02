import { CircleX } from "lucide-react";

export default function DataNotFound() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-red-700 bg-red-50 py-7">
      <CircleX className="h-11 w-11 text-red-700" />
      <div className="mt-2">
        <div className="text-center text-xl text-red-700">
          Sorry, no results found for your search.
        </div>
      </div>
    </div>
  );
}
