import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axiosInstance, { baseURL } from "@/lib/axios";
import { Resource } from "@/lib/definitions";
import { convertGoogleDriveLinkToDownloadLink, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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

  const { isPending, error, data } = useQuery({
    queryKey: ["resources"],
    queryFn: () => fetch(baseURL + "/resources").then((res) => res.json()),
  });

  function handleDelete(id: string) {
    if (!id) {
      return;
    }
    axiosInstance
      .delete(`/resources/${id}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                          <AlertDialogTitle>Delete resource</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div className="my-2">
                              Are you sure you want to delete the resource{" "}
                              <span className="text-black">{r.name}</span>
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
                              handleDelete(r._id);
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
      )}
    </AdminLayout>
  );
}
