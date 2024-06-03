import { useRouter } from "next/router";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import { Audio } from "@/lib/definitions";
import { baseURL } from "@/lib/axios";
import { formatAdditionalReferences, formatDate } from "@/lib/utils";

import AudioPlayer from "@/components/audio-player";
import Navbar from "@/components/navbar";
import ShareButton from "@/components/share-button";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  const { isPending, error, data } = useQuery({
    queryKey: [id?.[0]],
    queryFn: async () => {
      const response = await fetch(baseURL + `/fatwas/${id?.[0]}`);
      return response.json();
    },
  });

  if (isPending) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  return (
    <>
      <Head>
        <title>{data.title} - Garden of Ilm</title>
        <meta name="description" content={data.reply} />
      </Head>
      <Navbar />
      <div className="border-t border-neutral-300 pb-12 pt-4 md:pb-8 md:pt-0">
        <div className="mx-auto max-w-4xl px-[16px] py-0 md:px-[72px] md:pb-[50px] md:pt-3">
          <h1 className="mt-[12px] text-[20px] font-semibold text-[#465c3e] md:mt-[26px] md:text-[24px]">
            {data.title}
          </h1>

          <div className="mt-3 flex items-center space-x-2 text-sm md:text-base">
            <div className="text-neutral-500">
              Uploaded {formatDate(data.createdAt)}
            </div>
            <div className="select-none text-neutral-300">|</div>
            <div className="text-neutral-500">{data.views} Views</div>
            <div className="grow"></div>
            <div>
              <ShareButton />
            </div>
          </div>

          <div className="mt-[20px] rounded-xl border-4 border-[#c7dfbd] bg-[#c7dfbd] md:mt-[42px]">
            <div className="px-2 py-1.5 pb-2 text-sm font-bold uppercase tracking-[3.5px] text-[#5f7d54] md:text-lg">
              Question
            </div>
            <h2 className="rounded-b-xl bg-[#fff] px-4 py-3 text-[14px] font-medium leading-[24px] text-[#19372B] md:text-[20px] md:leading-[32px]">
              {data.question}
            </h2>
          </div>

          {data?.audios.map((audio: Audio) => (
            <AudioPlayer key={audio._id} url={audio.url} />
          ))}

          <div className="mt-[20px] text-sm font-bold uppercase leading-[24px] tracking-[4px] text-[#5f7d54] md:mt-[42px] md:text-[18px]">
            {data.author}
          </div>

          <div className="mt-[15px] whitespace-pre-wrap text-[15px] leading-7 md:text-[18px] md:leading-10">
            {data.reply}
          </div>

          {data.additionalReferences && (
            <div className="mt-[20px]">
              <p className="mt-[20px] text-sm font-bold uppercase leading-[24px] tracking-[4px] text-[#5f7d54] md:mt-[42px] md:text-[18px]">
                Additional references
              </p>
              <div className="mt-[12px] rounded-[12px] border-[1px] border-[#0000004d] bg-white px-[16px] py-[16px] text-[14px] md:px-[24px] md:py-[16px] md:text-[16px]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatAdditionalReferences(
                      data.additionalReferences,
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
