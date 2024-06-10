import { useRouter } from "next/router";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import { baseURL } from "@/lib/axios";
import {
  convertDropboxLinkToAudioSrcLink,
  formatAdditionalReferences,
  formatDate,
  toKebabCase,
} from "@/lib/utils";

import AudioPlayer from "@/components/audio-player";
import ShareButton from "@/components/share-button";
import Layout from "@/components/layout";

export default function Page() {
  const router = useRouter();

  const { slug } = router.query;

  const id = slug?.[0];
  const title = slug?.[1] ?? "";

  const { isPending, error, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await fetch(baseURL + `/benefits/${id}`);
      return response.json();
    },
  });

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "",
  };

  if (error) {
    return error.message;
  }

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />

        {isPending && <title>Garden of Ilm</title>}

        {!isPending && !error && (
          <>
            <title>{data.title} - Garden of Ilm</title>

            <meta name="description" content={data?.content} />
            <meta name="keywords" content={data.title} />

            <meta
              property="og:title"
              content={`${data.title} - Garden of Ilm`}
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`https://gardenofilm.com/benefits/${id}/${toKebabCase(
                title as string,
              )}`}
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
          </>
        )}
      </Head>

      <div className="border-t border-neutral-300 bg-[#f9fbfa] pb-12 pt-4 md:pb-8 md:pt-0">
        <div className="mx-auto max-w-4xl px-[16px] py-0 md:px-[72px] md:pb-[50px] md:pt-3">
          {isPending && "Loading..."}

          {!isPending && !error && (
            <>
              <h1 className="mt-[12px] text-lg font-semibold text-[#465c3e] md:mt-[26px] md:text-[24px]">
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

              <div className="mt-5">
                {data?.audioUrl && (
                  <AudioPlayer
                    url={convertDropboxLinkToAudioSrcLink(data.audioUrl)}
                  />
                )}
              </div>

              <div className="mt-5 text-sm font-bold uppercase leading-[24px] tracking-[4px] text-[#5f7d54] md:mt-[42px] md:text-[18px]">
                {data.author}
              </div>

              <div className="mt-[15px] whitespace-pre-wrap text-base leading-7 md:text-lg md:leading-10">
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
