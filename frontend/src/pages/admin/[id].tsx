import Loader from "@/components/loader";
import AuthGuard from "@/guard/AuthGuard";
import useFetchFatwaById from "@/hooks/useFetchFatwaById";
import AdminLayout from "@/layouts/AdminLayout";
import {formatDate} from "@/utils/date";
import {useRouter} from "next/router";
import React from "react";
import {formatAddinionalReferance} from "@/utils/string";
import AudioPlayer from "@/components/audio-player";

export default function AdminFatwaById() {
  const { query } = useRouter();
  const { data, loading } = useFetchFatwaById(query.id as string);

  const referance = formatAddinionalReferance(data?.additional_preference);


  if (loading) {
    return <Loader />;
  }

  return (
    <AuthGuard>
      <AdminLayout
        buttonText="Edit fatwa"
        is_heading
        is_showcase
        withMobileLogo={true}
        search={true}
        title="Full fatwa"
        description=""
        isEdit={true}
      >
        <div className="py-[20px] md:py-[50px]">
          <div
            className="container"
            style={{
              maxWidth: "950px",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] md:text-[16px] text-[#B99470]">
                Fatwa ID: {data?.generated_id?.replaceAll(" ", "")}
              </span>
              <span className="text-[12px] md:text-[16px] text-[#B99470]">
                Date posted: {formatDate(data?.createdAt)}
              </span>
            </div>
            <h1 className="text-[#66513E] text-[16px]  md:text-[24px] font-semibold mt-[12px] md:mt-[26px]">
              {data?.question_headline}
            </h1>

            <div className="border-[4px] rounded-[12px] p-[24px] mt-[20px] md:mt-[32px] bg-[#E9DED3] border-l-0 border-r-0 border-b-0 border-[#836950]">
              <span className="text-[12px] md:text-[20px] font-bold text-[#836950]">
                Question
              </span>
              <h2 className="text-[12px] leading-[24px] md:text-[20px] font-medium text-[#000000cc] mt-[12px] md:leading-[32px]">
                {data?.full_question}
              </h2>
            </div>
            <span className="text-[12px] leading-[24px] md:text-[20px] mt-[20px] md:mt-[32px] block font-bold text-[#836950]">
              {data?.author}
            </span>
            {data?.audios?.map((audio) => (
              <AudioPlayer key={audio._id} {...audio} />
            ))}
            <div className="mt-[4px] md:mt-[10px]">
              <div className="mt-[4px] md:mt-[10px] whitespace-pre-wrap text-[12px] md:text-[20px] text-[#000000cc] md:leading-[40px]">
                {data?.detailed_answer}
              </div>
            </div>
            {data?.additional_preference && (
              <div className="mt-[20px]">
                <p className="text-[12px] leading-[24px] md:text-[20px] mt-[20px] md:mt-[32px] block font-bold text-[#836950]">
                  Additional references
                </p>
                <div className="bg-white py-[16px] px-[16px] md:py-[16px] md:px-[24px] rounded-[12px] mt-[12px] border-[1px] border-[#0000004d]">
                  <div
                      className="additional_preference"
                      dangerouslySetInnerHTML={{__html: referance}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}
