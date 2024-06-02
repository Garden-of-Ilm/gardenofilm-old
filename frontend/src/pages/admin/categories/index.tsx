import axiosInstance, { baseURL } from "@/lib/axios";
import { Category } from "@/lib/definitions";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "@/components/modal";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(baseURL + "/categories").then((res) => res.json()),
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
      .delete(`/categories/${selected}`)
      .then(() => {
        handleClose();
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isPending) {
    return "Loading...";
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <div className="grow">
          <h2 className="text-2xl font-semibold">Categories</h2>
        </div>
        <div>
          <Button onClick={() => router.push("./categories/create")}>
            <Plus className={"mr-1 h-4 w-4"} /> New Category
          </Button>
        </div>
      </div>

      {isPending && "Loading..."}

      {!isPending && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((c: Category, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="py-1">{c.name}</TableCell>
                  <TableCell className="py-1">
                    {formatDate(c.createdAt)}
                  </TableCell>
                  <TableCell className="py-1 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-400"
                      onClick={() => openDeleteModal(c._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      <Modal open={open} setOpen={setOpen}>
        <div className="">
          <p className="text-center">Do you want to delete this category?</p>
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
