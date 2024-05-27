import { FormEvent, useState } from "react";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { Benefit } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import axiosInstance, { baseURL } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin-layout";
import Modal from "@/components/modal";
import PaginationMenu from "@/components/pagination-menu";

import MagnifyingGlassIcon from "@/icons/magnifying-glass";
import PlusIcon from "@/icons/plus";

export default function Page() {
  const router = useRouter();
  const { push } = useRouter();

  const searchParams = useSearchParams();
  const page = (searchParams.get("page") ?? 1) as number;
  const q = searchParams.get("q") ?? "";

  const { isPending, error, data } = useQuery({
    queryKey: [page, q],
    queryFn: async () => {
      const response = await fetch(
        baseURL + `/benefits?limit=9&page=${page}&q=${q}`,
      );
      return response.json();
    },
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const openDeleteModal = (id: string) => {
    setSelected(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    axiosInstance
      .delete(`/benefits/${selected}`)
      .then(() => {
        handleClose();
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const params = new URLSearchParams(searchParams);

  function handleSearch(term: string) {
    term ? params.set("q", term) : params.delete("q");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    params.set("page", "1");
    push(`/admin/benefits?${params.toString()}`);
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <div className="grow">
          <h2 className="text-2xl font-semibold">Benefits</h2>
        </div>
        <div>
          <Button onClick={() => router.push("./benefits/create")}>
            <PlusIcon className={"mr-1 h-4 w-4"} /> Upload Benefit
          </Button>
        </div>
      </div>
      <form
        className="mx-4 my-1 w-2/5 py-3 text-center"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <input
            className="w-full rounded border border-slate-400 px-0 py-1 pl-11"
            type="text"
            placeholder="Search benefits"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("q")?.toString()}
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#a8afb9]" />
        </div>
      </form>
      {isPending && "Loading..."}
      {!isPending && (
        <div className="px-4">
          <div className="h-[400px]">
            <table className="w-full">
              <thead className="border-b border-slate-400 font-normal">
                <tr className="text-sm font-normal text-neutral-500">
                  <th className="w-[40%] text-left">Title</th>
                  <th className="w-[12%] text-left">Author</th>
                  <th className="w-[10%] text-left">Uploaded</th>
                  <th className="w-[8%] text-left">Category</th>
                  <th className="text-left">Views</th>
                  <th className=""></th>
                  <th className=""></th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 border-b border-slate-300">
                {data?.benefits.map((b: Benefit, index: number) => {
                  return (
                    <tr key={index} className="h-[40px] text-xs">
                      <td className="pr-4 text-left">{b.title}</td>
                      <td className="text-left">{b.author}</td>
                      <td className="text-left">{formatDate(b.createdAt)}</td>
                      <td className="text-left">{b.category || "-"}</td>
                      <td className="text-left">{b.views}</td>
                      <td>
                        <Link
                          href={`/benefits/${b._id}`}
                          target="_blank"
                          className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`./benefits/${b._id}/edit`}
                          className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => openDeleteModal(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <PaginationMenu
            subdirectory="admin/fatwas"
            page={data?.paging.page}
            perPage={data?.paging.perPage}
            pages={data?.paging.pages}
            total={data?.paging.total}
          />
        </div>
      )}
      <Modal open={open} setOpen={setOpen}>
        <div className="">
          <p className="text-center">Do you want to delete this benefit?</p>
          <div className="mt-[16px] flex items-center justify-center">
            <button className="bg-[#DFDCD9]" onClick={handleClose}>
              Cancel
            </button>
            <button className="bg-[#F33] text-white" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
