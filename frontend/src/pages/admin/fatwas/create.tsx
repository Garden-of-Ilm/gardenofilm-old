import React, { useRef, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { Audio } from "@/lib/definitions";
import { Controller, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import AudioUpload from "@/components/audio-upload";
import RHFTextAreaField from "@/components/RHFTextAreaField";

import { Button } from "@/components/ui/button";
import { ChevronLeft, TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function FatwaCreate() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

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

  if (loading) {
    return;
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
      <div className="pb-10 pt-5">
        <FormProvider {...methods}>
          <form
            className="mx-auto max-w-3xl px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-lg font-semibold leading-none tracking-tight">
              Upload new fatwa
            </div>
            {error && (
              <div className="mt-4 flex w-full items-center justify-center rounded-md bg-red-100 py-3 text-base font-medium uppercase text-rose-600">
                <TriangleAlert className="h-6 w-6" /> {error}
              </div>
            )}

            <div className="mt-4">
              <Label>Author</Label>
              <Controller
                name="author"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="mt-1 w-full rounded-lg border border-gray-400 p-6"
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Label>Title</Label>
              <RHFTextAreaField
                className={
                  "mt-1 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
                }
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="mt-4">
              <Label>Question</Label>
              <RHFTextAreaField
                name="question"
                className={
                  "mt-1 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
                }
                placeholder="Question"
              />
            </div>

            <div className="mt-4">
              <Label>Reply</Label>
              <RHFTextAreaField
                name="reply"
                className={
                  "mt-1 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
                }
                placeholder="Reply"
              />
            </div>

            <div className="mt-4">
              <Label>Category</Label>
              <RHFTextAreaField
                name="category"
                className={
                  "mt-1 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
                }
                placeholder="Category"
              />
            </div>

            <div className="mt-4">
              <Label>Additional References</Label>
              <RHFTextAreaField
                name="additionalReferences"
                className={
                  "mt-1 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
                }
                placeholder="Additional References"
              />
            </div>

            <div className="mt-4">
              <AudioUpload audios={fatwaAudios} />
            </div>
            <button type="submit" className="hidden" ref={submitBtnRef} />
            <div className="mt-8">
              <Button
                type="button"
                onClick={() => {
                  if (submitBtnRef?.current) {
                    submitBtnRef.current.click();
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </AdminLayout>
  );
}
