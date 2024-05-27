import { useRouter } from "next/router";

interface Props {
  subdirectory: string;
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export default function PaginationMenu({
  subdirectory,
  total,
  page,
  perPage,
  pages,
}: Props) {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-fit items-center rounded">
      <div className="text-center md:w-[250px]">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium text-black">
            {(page - 1) * perPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-black">
            {Math.min(page * perPage, total)}
          </span>{" "}
          of <span className="font-medium text-black">{total}</span> results
        </p>
      </div>
      <div className="flex items-center justify-center px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between">
          <button
            className="relative inline-flex items-center rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:bg-gray-50 disabled:border-gray-400 disabled:text-gray-400"
            disabled={page == 1}
            onClick={() => {
              // router.push(`/fatwas?page=${page - 1}`);
              const params = new URLSearchParams(window.location.search);
              const currentPage = parseInt(params.get("page") || "1");
              const nextPage = currentPage - 1;
              params.set("page", nextPage.toString());
              const newQueryString = params.toString();
              router.push(`/${subdirectory}?${newQueryString}`);
            }}
          >
            Previous
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-lg border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:bg-gray-50 disabled:border-gray-400 disabled:text-gray-400"
            disabled={page == pages}
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              // const currentPage = parseInt(params.get("page") || "1");
              const nextPage = parseInt(String(page)) + 1;
              params.set("page", nextPage.toString());
              const newQueryString = params.toString();
              router.push(`/${subdirectory}?${newQueryString}`);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
