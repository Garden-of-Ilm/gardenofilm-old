import axiosInstance, { baseURL } from "@/lib/axios";
import AdminNavbar from "@/components/admin-navbar";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import AuthGuard from "@/guard/AuthGuard";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ChevronLeftIcon from "@/icons/chevron-left";

export default function Page() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    axiosInstance
      .post("/categories", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        router.push("./");
      })
      .catch((err) => console.log(err));
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <Link
          href="./"
          className="flex items-center py-1.5 text-blue-600 hover:text-blue-700"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="w-full py-5">
        <form action="post" onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="text-lg font-semibold leading-none tracking-tight">
            Create new category
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mt-6">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
