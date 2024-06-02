import { useRouter } from "next/router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";

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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={clsx("cursor-pointer select-none hover:bg-slate-200", {
              "text-slate-400 hover:text-slate-400": page == 1,
            })}
            onClick={() => {
              if (page == 1) {
                return;
              }
              const params = new URLSearchParams(window.location.search);
              const currentPage = parseInt(params.get("page") || "1");
              const nextPage = currentPage - 1;
              params.set("page", nextPage.toString());
              const newQueryString = params.toString();
              router.push(`/${subdirectory}?${newQueryString}`);
            }}
          />
        </PaginationItem>
        {Array.from({ length: pages }, (_, i) => i + 1).map((pageNumber) => {
          const offset = Math.abs(pageNumber - page);
          if (pageNumber == 1 || offset <= 1 || pageNumber == pages) {
            return (
              <>
                {pageNumber == pages && offset > 2 ? (
                  <PaginationItem className="hidden md:inline-flex">
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <></>
                )}
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className={clsx(
                      "hidden cursor-pointer select-none hover:bg-slate-200 md:inline-flex",
                      {
                        "border-slate-400": pageNumber == page,
                      },
                    )}
                    isActive={pageNumber == page}
                    onClick={() => {
                      const params = new URLSearchParams(
                        window.location.search,
                      );
                      params.set("page", pageNumber.toString());
                      const newQueryString = params.toString();
                      router.push(`/${subdirectory}?${newQueryString}`);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>

                {pageNumber == 1 && offset > 2 ? (
                  <PaginationItem className="hidden md:inline-flex">
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <></>
                )}
              </>
            );
          }
        })}
        <PaginationItem>
          <PaginationNext
            className={clsx("cursor-pointer select-none hover:bg-slate-200", {
              "text-slate-400 hover:text-slate-400": page == pages,
            })}
            onClick={() => {
              if (page == pages) {
                return;
              }
              const params = new URLSearchParams(window.location.search);
              // const currentPage = parseInt(params.get("page") || "1");
              const nextPage = parseInt(String(page)) + 1;
              params.set("page", nextPage.toString());
              const newQueryString = params.toString();
              router.push(`/${subdirectory}?${newQueryString}`);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
