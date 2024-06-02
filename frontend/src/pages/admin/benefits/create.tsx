import { FormEvent, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import axiosInstance from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin-layout";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axiosInstance
      .post("/benefits", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        router.push("/admin/benefits");
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
            Upload new benefit
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">
              Title{" "}
              <span className="font-normal text-zinc-400">(required)</span>
            </Label>
            <Input
              type="text"
              className="border-slate-400"
              id="title"
              name="title"
              required
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label>
              Author{" "}
              <span className="font-normal text-zinc-400">(required)</span>
            </Label>
            <Select name="author" required>
              <SelectTrigger className="w-[250px] border-slate-400">
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent className="border-slate-300">
                <SelectGroup>
                  <SelectLabel>Authors</SelectLabel>
                  <SelectItem value="Sheikh Ibn Baz">Sheikh Ibn Baz</SelectItem>
                  <SelectItem value="Sheikh Ibn Uthaymeen">
                    Sheikh Ibn Uthaymeen
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Albani">
                    Sheikh Al-Albani
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Fawzan">
                    Sheikh Al-Fawzan
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Luhaydan">
                    Sheikh Al-Luhaydan
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="content">
              Content{" "}
              <span className="font-normal text-zinc-400">(required)</span>
            </Label>
            <Textarea
              className="border-slate-400"
              id="content"
              name="content"
              required
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="audioUrl">Audio URL</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="audioUrl"
              name="audioUrl"
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="category"
              name="category"
            />
          </div>
          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="additionalReferences">Additional References</Label>
            <Textarea
              className="border-slate-400"
              id="additionalReferences"
              name="additionalReferences"
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
