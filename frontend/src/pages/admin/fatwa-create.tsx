import React, { useEffect, useRef, useState } from "react";
import AuthGuard from "@/guard/AuthGuard";
import AdminLayout from "@/layouts/AdminLayout";
import FatwaCreateForm from "@/sections/dashboard/fatwa-create/fatwa-create-form";
import axiosInstance from "@/api";
import { useRouter } from "next/router";
import { Audio, FatwaById } from "@/api/fatwa-res";
import Loader from "@/components/loader";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";

export default function FatwaCreate() {
  const mobileScreen =
    typeof window !== "undefined" && window?.innerWidth <= 768;

  const router = useRouter();
  const fatwaId = router.query.fatwaId;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fatwaAudios, setFatwaAudios] = useState<Audio[] | []>([]);
  const defaultValues: any = {
    author: "",
    detailed_answer: "",
    question_headline: "",
    full_question: "",
    additional_preference: "",
    audios: [],
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    fatwaId ? await handleUpdate(data) : await handleCreate(data);
  };

  const handleClearError = () => {
    setError(null);
  };

  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleCreate = async (data: typeof defaultValues) => {
    axiosInstance
      .post("/fatwa/create", data)
      .then((res) => {
        router.push("/admin/fatwa-list");
      })
      .catch((err: any) => {
        setError(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const handleUpdate = async (data: typeof defaultValues) => {
    if (!fatwaId) return;
    axiosInstance
      .patch(`/fatwa/update/${fatwaId}`, data)
      .then((res) => {
        router.push("/admin/fatwa-list");
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
        const data = await axiosInstance.get<FatwaById>(
          `/fatwa/get/${fatwaId}`,
        );
        const {
          additional_preference,
          question_headline,
          full_question,
          detailed_answer,
          author,
          audios,
        } = data.data;
        setLoading(false);
        setFatwaAudios(audios);
        const sortedAudios = audios?.map((audio) => audio?._id);
        reset({
          additional_preference,
          question_headline,
          full_question,
          detailed_answer,
          author,
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
    return <Loader />;
  }
  return (
    <AuthGuard>
      <AdminLayout
        is_showcase={true}
        withMobileLogo={true}
        is_heading={true}
        search={mobileScreen}
        title={fatwaId ? "Fatwa Edit" : "Fatwa Create"}
        isForm={true}
        formRef={submitBtnRef}
        buttonText={fatwaId ? "Save fatwa" : "Publish fatwa"}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FatwaCreateForm
            error={error}
            clearError={handleClearError}
            audios={fatwaAudios}
          />
          <button type="submit" className="hidden" ref={submitBtnRef} />
        </FormProvider>
      </AdminLayout>
    </AuthGuard>
  );
}
