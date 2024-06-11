import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { Audio } from "@/lib/definitions";
import { Controller, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import AudioUpload from "@/components/audio-upload";

import { Button } from "@/components/ui/button";
import { ChevronLeft, TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function FatwaCreate() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [fatwaAudios, setFatwaAudios] = useState<Audio[] | []>([]);
  const defaultValues: any = {
    author: "",
    reply: "",
    title: "",
    question: "",
    additionalReferences: "",
    audios: [],
  };

  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    await handleCreate(data);
  };

  const handleCreate = async (data: typeof defaultValues) => {
    axiosInstance
      .post("/fatwas", data)
      .then((res) => {
        router.push("/admin/fatwas");
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message ?? "Something went wrong");
      });
  };

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
        <FormProvider {...methods}>
          <form className="mx-auto max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-lg font-semibold leading-none tracking-tight">
              Upload new fatwa
            </div>
            {error && (
              <div className="mt-4 flex w-full items-center justify-center rounded-md bg-red-100 py-3 text-base font-medium uppercase text-rose-600">
                <TriangleAlert className="mr-1.5 h-6 w-6" /> {error}
              </div>
            )}

            <div className="mt-4">
              <Label>Title</Label>
              <Controller
                name="title"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Author</Label>
              <Controller
                name="author"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Question</Label>
              <Controller
                name="question"
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={5}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Reply</Label>
              <Controller
                name="reply"
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={10}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Category</Label>
              <Controller
                name="category"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Additional References</Label>
              <Controller
                name="additionalReferences"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-3 text-sm"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <AudioUpload audios={fatwaAudios} />
            </div>

            <Button className="mt-8" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </div>
    </AdminLayout>
  );
}
