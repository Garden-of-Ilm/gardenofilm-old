import { useRouter } from "next/router";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import { baseURL } from "@/lib/axios";
import {
  convertDropboxLinkToAudioSrcLink,
  formatAdditionalReferences,
  formatDate,
} from "@/lib/utils";

import AudioPlayer from "@/components/audio-player";
import Navbar from "@/components/navbar";
import ShareButton from "@/components/share-button";
import Layout from "@/components/layout";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  const { isPending, error, data } = useQuery({
    queryKey: [id?.[0]],
    queryFn: async () => {
      const response = await fetch(baseURL + `/benefits/${id?.[0]}`);
      return response.json();
    },
  });

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "",
  };

  if (isPending) {
    return "Loading...";
  }

  if (error) {
    return error.message;
  }

  return (
    <Layout>
      <Head>
        <title>{data.title} - Garden of Ilm</title>
        <meta charSet="utf-8" />
        <meta name="description" content={data?.content} />
        <meta name="keywords" content={data.title} />

        <meta property="og:title" content={`${data.title} - Garden of Ilm`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://gardenofilm.com/benefits/${id?.[0]}/${id?.[1]}`}
        />
        <meta property="og:image" content="/logo.png" />

        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content={`${data.title} - Garden of Ilm`}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="border-t border-neutral-300 bg-[#f9fbfa] pb-12 pt-4 md:pb-8 md:pt-0">
        <div className="mx-auto max-w-4xl px-[16px] py-0 md:px-[72px] md:pb-[50px] md:pt-3">
          <h1 className="mt-[12px] text-[18px] font-semibold text-[#465c3e] md:mt-[26px] md:text-[24px]">
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

          {data?.audioUrl && (
            <AudioPlayer
              url={convertDropboxLinkToAudioSrcLink(data.audioUrl)}
            />
          )}

          <div className="mt-[20px] text-sm font-bold uppercase leading-[24px] tracking-[4px] text-[#5f7d54] md:mt-[42px] md:text-[18px]">
            {data.author}
          </div>
          <div className="mt-[15px] whitespace-pre-wrap text-[15px] leading-7 md:text-[18px] md:leading-10">
            {data.content}
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
                      data?.additionalReferences,
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
