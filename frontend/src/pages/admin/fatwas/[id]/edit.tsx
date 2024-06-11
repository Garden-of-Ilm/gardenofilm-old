import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { Audio, FatwaById } from "@/lib/definitions";
import { Controller, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

import AudioUpload from "@/components/audio-upload";

import { Button } from "@/components/ui/button";
import { ChevronLeft, TriangleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function Page() {
  const router = useRouter();
  const fatwaId = router.query.id;

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

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    await handleUpdate(data);
  };

  const handleUpdate = async (data: typeof defaultValues) => {
    if (!fatwaId) return;
    axiosInstance
      .patch(`/fatwas/${fatwaId}`, data)
      .then((res) => {
        router.push("/admin/fatwas");
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    const fetchFatwaData = async () => {
      try {
        if (!fatwaId) return;
        setLoading(true);
        const data = await axiosInstance.get<FatwaById>(`/fatwas/${fatwaId}`);
        const {
          additionalReferences,
          title,
          question,
          reply,
          author,
          audios,
          category,
        } = data.data;
        setLoading(false);
        setFatwaAudios(audios);
        const sortedAudios = audios?.map((audio) => audio?._id);
        reset({
          additionalReferences,
          title,
          question,
          reply,
          author,
          category,
          audios: sortedAudios ?? [],
        });
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchFatwaData();
  }, [fatwaId]);

  if (loading) {
    return;
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <Link
          href={"../"}
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
              Edit fatwa
            </div>

            {error && (
              <div className="mt-4 flex w-full items-center justify-center rounded-md bg-red-100 py-3 text-base font-medium uppercase text-rose-600">
                <TriangleAlert className="h-6 w-6" /> {error}
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
