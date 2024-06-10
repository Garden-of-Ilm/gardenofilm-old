import { FormEvent } from "react";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { Fatwa } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import axiosInstance, { baseURL } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin-layout";
import PaginationMenu from "@/components/pagination-menu";

import { Plus, Search } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const router = useRouter();
  const { push } = useRouter();

  function handleDelete(id: string) {
    if (!id) {
      return;
    }
    axiosInstance
      .delete(`/fatwas/${id}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const searchParams = useSearchParams();
  const page = (searchParams.get("page") ?? 1) as number;
  const q = searchParams.get("q") ?? "";

  const { isPending, error, data } = useQuery({
    queryKey: ["fatwas", page, q],
    queryFn: async () => {
      const response = await fetch(
        baseURL + `/fatwas?limit=7&page=${page}&q=${q}`,
      );
      return response.json();
    },
  });

  const params = new URLSearchParams(searchParams);

  function handleSearch(term: string) {
    term ? params.set("q", term) : params.delete("q");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    params.set("page", "1");
    push(`/admin/fatwas?${params.toString()}`);
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <div className="grow">
          <h2 className="text-2xl font-semibold">Fatwas</h2>
        </div>
        <div>
          <Button onClick={() => router.push("./fatwas/create")}>
            <Plus className={"mr-1 h-4 w-4"} /> Upload Fatwa
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
            placeholder="Search fatwas"
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
              {data?.fatwas.map((f: Fatwa, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="py-1">{f.title}</TableCell>
                    <TableCell className="py-1">{f.author}</TableCell>
                    <TableCell className="py-1">
                      {formatDate(f.createdAt)}
                    </TableCell>
                    <TableCell className="py-1">{f.category || "-"}</TableCell>
                    <TableCell className="py-1">{f.views}</TableCell>
                    <TableCell className="flex justify-end space-x-2.5 py-1">
                      <Button
                        variant="outline"
                        className="border-slate-400"
                        asChild
                      >
                        <Link href={`/fatwas/${f._id}`} target="_blank">
                          View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-400"
                        asChild
                      >
                        <Link href={`./fatwas/${f._id}/edit`}>Edit</Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-slate-400"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete fatwa</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="my-2">
                                Are you sure you want to delete the fatwa{" "}
                                <span className="text-black">{f.title}</span>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-slate-300">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 text-white hover:bg-red-600"
                              onClick={() => {
                                handleDelete(f._id);
                              }}
                            >
                              Yes, delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <PaginationMenu
            subdirectory="admin/fatwas"
            page={data?.paging.page}
            perPage={data?.paging.perPage}
            pages={data?.paging.pages}
            total={data?.paging.total}
          />
        </>
      )}
    </AdminLayout>
  );
}
