import { FormEvent, useState } from "react";

import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axiosInstance
      .post("/resources", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        router.push("/admin/resources");
      })
      .catch((err) => console.log(err));
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <Link
          href={"./"}
          className="flex items-center py-1.5 text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="px-4 pb-10 pt-5">
        <form action="post" onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="text-lg font-semibold leading-none tracking-tight">
            Upload new resource
          </div>
          <div className="mt-6 grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mt-6 grid w-full max-w-md items-center gap-1.5">
            <Label htmlFor="downloadUrl">Google Drive Link</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="downloadUrl"
              name="downloadUrl"
            />
          </div>
          <details className="mt-4 max-w-md rounded border border-slate-300 px-3 py-2 text-sm text-slate-500">
            <summary className="cursor-pointer select-none text-slate-800">
              How to obtain the Google Drive link?
            </summary>
            <ol className="mt-2 space-y-1.5">
              <li>
                1. Go to Google Drive and locate the file you wish to upload.
              </li>
              <li>
                2. Right-click on the file and select &#34;Share&#34; from the
                options.
              </li>
              <li>
                3. Ensure the file&apos;s access is set to &#34;Anyone with the
                link.&#34;
              </li>
              <li>4. Click on the &#34;Copy link&#34; button.</li>
            </ol>
          </details>
          <div className="mt-6">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
