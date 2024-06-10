import React, { FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Audio } from "@/lib/definitions";
import axiosInstance from "@/lib/axios";

import AdminLayout from "@/components/admin-layout";
import AudioUpload from "@/components/audio-upload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FatwaCreate() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [fatwaAudios, setFatwaAudios] = useState<Audio[] | []>([]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axiosInstance
      .post("/fatwas", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        router.push("/admin/fatwas");
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message ?? "Something went wrong");
      });
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
        <form method="post" className="mx-auto max-w-3xl" onSubmit={onSubmit}>
          <div className="text-lg font-semibold leading-none tracking-tight">
            Upload new fatwa
          </div>
          {error && (
            <div className="mt-4 flex w-full items-center justify-center rounded-md bg-red-100 py-3 text-base font-medium uppercase text-rose-600">
              <TriangleAlert className="h-6 w-6" /> {error}
            </div>
          )}

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
                  <SelectItem value="Sheikh Ibn Al-Uthaymeen">
                    Sheikh Ibn Al-Uthaymeen
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Albani">
                    Sheikh Al-Albani
                  </SelectItem>
                  <SelectItem value="Sheikh Saleh Al-Fawzan">
                    Sheikh Saleh Al-Fawzan
                  </SelectItem>
                  <SelectItem value="Sheikh Saleh Al-Luhaydan">
                    Sheikh Saleh Al-Luhaydan
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 grid w-full items-center gap-1.5">
            <Label htmlFor="question">
              Question{" "}
              <span className="font-normal text-zinc-400">(required)</span>
            </Label>
            <Input
              type="text"
              className="border-slate-400"
              id="question"
              name="question"
              required
            />
          </div>

          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="reply">
              Reply{" "}
              <span className="font-normal text-zinc-400">(required)</span>
            </Label>
            <Textarea
              className="border-slate-400"
              id="reply"
              name="reply"
              rows={10}
              required
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
            <AudioUpload audios={fatwaAudios} />
          </div>

          <Button className="mt-8" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
