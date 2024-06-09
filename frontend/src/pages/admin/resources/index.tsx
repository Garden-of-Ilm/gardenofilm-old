import AdminLayout from "@/components/admin-layout";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axiosInstance, { baseURL } from "@/lib/axios";
import { Resource } from "@/lib/definitions";
import { convertGoogleDriveLinkToDownloadLink, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

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
    queryKey: ["resources"],
    queryFn: () => fetch(baseURL + "/resources").then((res) => res.json()),
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
      .delete(`/resources/${selected}`)
      .then(() => {
        handleClose();
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <div className="grow">
          <h2 className="text-2xl font-semibold">Resources</h2>
        </div>
        <div>
          <Button onClick={() => router.push("./resources/create")}>
            <Plus className={"mr-1 h-4 w-4"} /> Upload Resource
          </Button>
        </div>
      </div>

      {isPending && "Loading..."}

      {!isPending && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>File Format</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Download Link</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r: Resource, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="py-1">{r.name}</TableCell>
                  <TableCell className="py-1">{r.fileFormat}</TableCell>
                  <TableCell className="py-1">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell className="py-1">
                    <a
                      href={convertGoogleDriveLinkToDownloadLink(r.downloadUrl)}
                      className="cursor-pointer text-blue-500 underline hover:text-blue-400"
                    >
                      Download
                    </a>
                  </TableCell>
                  <TableCell className="py-1 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-400"
                      onClick={() => openDeleteModal(r._id)}
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
          <p className="text-center">Do you want to delete this resource?</p>
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
