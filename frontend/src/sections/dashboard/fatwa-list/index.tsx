import React, { useState } from "react";

import DashboardFatwaListStyles from "./fatwa-list.module.css";
import axiosInstance from "@/api";
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  EditIcon,
} from "@/icons";
import { formatDate } from "@/utils/date";
import DataNotFound from "@/components/data-not-found";
import { UseFetchFatwaList } from "@/hooks/useFetchFatwaList";
import ReactPaginate from "react-paginate";
import Modal from "@/components/modal";
import FatwaCardLoading from "@/components/fatwa-card-loading";

interface Props {
  fatwaLists?: UseFetchFatwaList;
  setFatwaLists: React.Dispatch<
    React.SetStateAction<UseFetchFatwaList | undefined>
  >;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  page: number;
}

function DashboardFatwaList({
  fatwaLists,
  setFatwaLists,
  setPage,
  page,
  loading,
}: Props) {
  const { query, push } = useRouter();

  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const openDeleteModal = (id: string) => {
    setSelected(id);
    setOpen(true);
  };

  const handlePageClick = (event: { selected: number }) => {
    console.log(event.selected);
    setPage(event.selected);
  };
  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };
  const handleDelete = async () => {
    if (!selected) return;
    axiosInstance
      .delete(`/fatwa/delete/${selected}`)
      .then(() => {
        // @ts-ignore
        setFatwaLists((prev) => {
          return {
            fatwaList: prev?.fatwaList.filter(
              (fatwa) => fatwa._id !== selected,
            ),
            totalPages: prev?.totalPages,
          };
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notFound = fatwaLists?.fatwaList.length === 0 || !fatwaLists;
  return (
    <>
      <div className={DashboardFatwaListStyles.wrapper}>
        <div className="container">
          {notFound && !loading && (
            <DataNotFound search={query.search as string} />
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
                {query?.search ? (
                  <>
                    Search results : <b>{query.search}</b>
                  </>
                ) : (
                  "All fatawa"
                )}
              </h2>
              <div className={DashboardFatwaListStyles.fatawaListWrapper}>
                {!loading &&
                  fatwaLists?.fatwaList?.map((fatwa, index) => (
                    <div
                      key={index}
                      className={
                        DashboardFatwaListStyles.fatawaCard +
                        " md:min-h-[150px]"
                      }
                      onClick={() => push(`/admin/${fatwa._id}`)}
                    >
                      <div
                        className={DashboardFatwaListStyles.fatawaCardActions}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            push(`/admin/fatwa-create?fatwaId=${fatwa._id}`)
                          }
                        >
                          <EditIcon />
                        </button>

                        <button onClick={() => openDeleteModal(fatwa._id)}>
                          <DeleteIcon />
                        </button>
                      </div>
                      <p className="max-w-[250px]">{fatwa.question_headline}</p>
                      <div
                        className={DashboardFatwaListStyles.fatawaCardFooter}
                      >
                        <span>{formatDate(fatwa.createdAt)}</span>
                        <span className="max-w-[146px] truncate">
                          {fatwa.author}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {!query.search && !loading && (
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
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className={DashboardFatwaListStyles.deleteWarningModal}>
          <p>Do you want to delete this fatwa?</p>
          <div>
            <button className="bg-[#DFDCD9]" onClick={handleClose}>
              Cancel
            </button>
            <button
              disabled={loading}
              className="bg-[#F33] text-white"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DashboardFatwaList;
