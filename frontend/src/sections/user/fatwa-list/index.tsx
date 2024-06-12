import DashboardFatwaListStyles from "./fatwa-list.module.css";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/date";
import DataNotFound from "@/components/data-not-found";
import React from "react";
import { UseFetchFatwaList } from "@/hooks/useFetchFatwaList";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";
import FatwaCardLoading from "@/components/fatwa-card-loading";

interface Props {
  fatwaLists?: UseFetchFatwaList;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  page: number;
}

function FatwaList({ fatwaLists, setPage, loading, page }: Props) {
  const router = useRouter();

  const notFound =
    fatwaLists?.fatwaList?.length === 0 || !fatwaLists?.fatwaList?.length;
  const handlePageClick = (newPage: { selected: number }) => {
    setPage(newPage.selected);
  };

  return (
    <div className={DashboardFatwaListStyles.wrapper}>
      <div className="container">
        {notFound && !loading && (
          <DataNotFound search={router.query.search as string} />
        )}
        {loading && (
          <div className={DashboardFatwaListStyles.fatawaListWrapper}>
            {new Array(10).fill(",").map((_, index) => (
              <FatwaCardLoading key={index} />
            ))}
          </div>
        )}
        {!notFound && !loading && (
          <>
            <h2 className={DashboardFatwaListStyles.fatawaListTitle}>
              {router.query?.search ? (
                <>
                  Search results : <b>{router.query.search}</b>
                </>
              ) : (
                "Latest fatawa"
              )}
            </h2>
            <div className="flex flex-col justify-between">
              <div className={DashboardFatwaListStyles.fatawaListWrapper}>
                {fatwaLists?.fatwaList?.map((fatwa, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/fatwa/${fatwa._id}`)}
                    className={
                      DashboardFatwaListStyles.fatawaCard + " md:min-h-[150px]"
                    }
                  >
                    <p>{fatwa.question_headline}</p>
                    <div className={DashboardFatwaListStyles.fatawaCardFooter}>
                      <span>{formatDate(fatwa.createdAt)}</span>
                      <span className="max-w-[146px] truncate">
                        {fatwa.author}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {!router.query.search && !loading && (
                <ReactPaginate
                  breakLabel="..."
                  initialPage={page}
                  nextLabel={<ChevronRightIcon />}
                  className="flex items-center justify-center gap-[5px] my-[20px]"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={fatwaLists?.totalPages ?? 1}
                  previousLabel={<ChevronLeftIcon />}
                  disabledClassName="opacity-[0.4] pointer-events-none"
                  containerClassName="flex items-center"
                  activeClassName="font-[500] text-[14px] bg-[#c7a98d] text-white shadow w-[28px] h-[28px] flex items-center justify-center rounded-[50%]"
                  pageClassName="font-[500] text-[14px] w-[28px] h-[28px] flex select-none items-center justify-center rounded-[50%]"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FatwaList;
