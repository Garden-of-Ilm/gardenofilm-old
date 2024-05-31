import React, { useRef, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { Audio } from "@/lib/definitions";
import FormProvider from "@/components/FormProvider";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import AudioUpload from "@/components/audio-upload";
import RHFTextAreaField from "@/components/RHFTextAreaField";

import ExclamationTriangleIcon from "@/icons/exclamation-triangle";
import { Button } from "@/components/ui/button";
import ChevronLeftIcon from "@/icons/chevron-left";

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
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="pb-10 pt-5">
        <FormProvider
          className="mx-auto max-w-3xl"
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-lg font-semibold leading-none tracking-tight">
            Upload new fatwa
          </div>

          {error && (
            <div className="mt-4 flex w-full items-center justify-center rounded-md bg-red-100 py-3 text-base font-medium uppercase text-rose-600">
              <ExclamationTriangleIcon className="h-6 w-6" /> {error}
            </div>
          )}

          <RHFTextAreaField
            className="mt-4 w-full rounded-lg border border-gray-400 p-6"
            name="author"
            placeholder="Author"
          />
          <RHFTextAreaField
            className={
              "mt-4 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
            }
            name="title"
            placeholder="Title"
          />
          <RHFTextAreaField
            name="question"
            className={
              "mt-4 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
            }
            placeholder="Question"
          />
          <RHFTextAreaField
            name="reply"
            className={
              "mt-4 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
            }
            placeholder="Reply"
          />

          <RHFTextAreaField
            name="category"
            className={
              "mt-4 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
            }
            placeholder="Category"
          />

          <RHFTextAreaField
            name="additionalReferences"
            className={
              "mt-4 block w-full rounded-lg border border-gray-400 bg-white p-6 text-base text-gray-800 outline-none"
            }
            placeholder="Additional References"
          />

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
        </FormProvider>
      </div>
    </AdminLayout>
  );
}
