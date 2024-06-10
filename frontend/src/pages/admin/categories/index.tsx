import axiosInstance, { baseURL } from "@/lib/axios";
import { Category } from "@/lib/definitions";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    queryKey: ["categories"],
    queryFn: () =>
      fetch(baseURL + "/categories?sort=name").then((res) => res.json()),
  });

  function handleDelete(id: string) {
    if (!id) {
      return;
    }
    axiosInstance
      .delete(`/categories/${id}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
                          <AlertDialogTitle>Delete category</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div className="my-2">
                              Are you sure you want to delete the category{" "}
                              <span className="text-black">{c.name}</span>
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
                              handleDelete(c._id);
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
