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

import { Plus, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        baseURL + `/benefits?limit=7&page=${page}&q=${q}`,
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
            <Plus className={"mr-1 h-4 w-4"} /> Upload Benefit
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
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-[#a8afb9]" />
        </div>
      </form>
      {isPending && "Loading..."}
      {!isPending && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.benefits.map((b: Benefit, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="py-1">{b.title}</TableCell>
                    <TableCell className="py-1">{b.author}</TableCell>
                    <TableCell className="py-1">
                      {formatDate(b.createdAt)}
                    </TableCell>
                    <TableCell className="py-1">{b.category || "-"}</TableCell>
                    <TableCell className="py-1">{b.views}</TableCell>
                    <TableCell className="flex justify-end space-x-2.5 py-1">
                      <Button
                        variant="outline"
                        className="border-slate-400"
                        asChild
                      >
                        <Link href={`/benefits/${b._id}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-400"
                        asChild
                      >
                        <Link href={`./benefits/${b._id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-400"
                        onClick={() => openDeleteModal(b._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <PaginationMenu
            subdirectory="admin/benefits"
            page={data?.paging.page}
            perPage={data?.paging.perPage}
            pages={data?.paging.pages}
            total={data?.paging.total}
          />
        </>
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
