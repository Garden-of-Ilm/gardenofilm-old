import { Rubik } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

import clsx from "clsx";

import { useQuery } from "@tanstack/react-query";

import { Benefit, Fatwa } from "@/lib/definitions";
import axiosInstance, { baseURL } from "@/lib/axios";

import Card from "@/components/card";
import { replaceMarkdownLinks, toKebabCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Layout from "@/components/layout";

const rubik = Rubik({ subsets: ["latin"] });

const featuredFatwaCategories = [
  "Aqidah",
  "Purification",
  "Prayer",
  "Zakah",
  "Hajj",
];

export default function Page() {
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["index"],
    queryFn: async () => {
      const response1 = await fetch(baseURL + `/fatwas?limit=4`);
      const response2 = await fetch(baseURL + `/benefits?limit=4`);
      const response3 = await fetch(
        baseURL + `/fatwas?limit=4&sort=views&order=desc`,
      );
      const response4 = await fetch(
        baseURL + `/benefits?limit=4&sort=views&order=desc`,
      );

      const response5 = await fetch(baseURL + `/banners`);

      if (
        !response1.ok ||
        !response2.ok ||
        !response3.ok ||
        !response4.ok ||
        !response5.ok
      ) {
        throw new Error("Network response was not ok");
      }

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const data4 = await response4.json();
      const data5 = await response5.json();

      return {
        recentFatwas: data1.fatwas,
        recentBenefits: data2.benefits,
        mostViewedFatwas: data3.fatwas,
        mostViewedBenefits: data4.benefits,
        banner: data5[0],
      };
    },
  });

  return (
    <Layout>
      <Head>
        <title>Garden of Ilm</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Garden of Ilm is a platform containing fatwas and benefits from the Ulema."
        />
      </Head>

      {data?.banner?.message && (
        <div
          className="bg-[#856918] py-2 text-center font-medium text-white"
          dangerouslySetInnerHTML={{
            __html: replaceMarkdownLinks(data?.banner?.message),
          }}
        ></div>
      )}

      <div className="bg-[#46615d] text-white">
        <div className="mx-auto flex max-w-7xl items-center px-[32px] py-10 md:px-[72px]">
          <div className="mx-auto max-w-7xl md:w-1/2 md:w-full">
            <h2
              className={clsx(
                rubik.className,
                "mb-1 text-[18px] text-[#a0bda7]",
              )}
            >
              السلام عليكم ورحمة الله وبركاته
            </h2>
            <h2 className="my-3 text-2xl sm:text-3xl">
              Welcome to <span className="font-bold">GardenofIlm.com</span>
            </h2>
            <p className="mt-[9px] leading-7">
              Discover and learn fatwas and benefits from Imam Ibn Baz, Ibn
              Uthaymeen, Al-Albani, Al-Fawzan, and Al-Luhaydan.
            </p>
            <p></p>
          </div>
          <div className="hidden md:block md:w-1/2"></div>
        </div>
      </div>

      <div className="bg-[#f9fbfa]">
        <div className="mx-auto max-w-7xl pb-16">
          <div className="mx-[32px] pt-6 md:mx-[72px]">
            <div className="font-medium text-zinc-500">
              Featured Fatwa Categories
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {featuredFatwaCategories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => router.push(`/fatwas?category=${category}`)}
                  className="cursor-pointer rounded-3xl border-slate-400 bg-white px-4 py-2 text-base font-normal"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {isPending && (
            <div className="mt-8 px-[32px] md:px-[72px]">Loading...</div>
          )}

          {error && (
            <div className="mt-8 px-[32px] md:px-[72px]">{error.message}</div>
          )}

          {!isPending && !error && (
            <>
              <div className="mx-[32px] mt-8 md:mx-[72px]">
                <div className="font-medium text-zinc-500">
                  Most Viewed Fatwas
                </div>
                <div className="mt-2.5">
                  <Carousel>
                    <CarouselContent className="">
                      {data!.mostViewedFatwas.map((f: Fatwa) => (
                        <CarouselItem
                          className="md:basis-1/2 lg:basis-1/3"
                          key={f._id}
                        >
                          <Card
                            title={f.title}
                            author={f.author}
                            createdAt={f.createdAt}
                            category={f.category}
                            views={f.views}
                            variant="2"
                            onClick={async () => {
                              await axiosInstance
                                .patch(`/fatwas/${f._id}/views`)
                                .then(() => {})
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            href={`/fatwas/${f._id}/${toKebabCase(f.title)}`}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-8 border-slate-500 bg-white" />
                    <CarouselNext className="mr-8 border-slate-500 bg-white" />
                  </Carousel>
                </div>
              </div>

              <div className="mx-[32px] mt-8 md:mx-[72px]">
                <div className="font-medium text-zinc-500">
                  Most Viewed Benefits
                </div>
                <div className="mt-2.5">
                  <Carousel className="">
                    <CarouselContent className="">
                      {data!.mostViewedBenefits.map((b: Fatwa) => (
                        <CarouselItem
                          className="md:basis-1/2 lg:basis-1/3"
                          key={b._id}
                        >
                          <Card
                            title={b.title}
                            author={b.author}
                            createdAt={b.createdAt}
                            category={b.category}
                            views={b.views}
                            variant="2"
                            onClick={async () => {
                              await axiosInstance
                                .patch(`/benefits/${b._id}/views`)
                                .then(() => {})
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            href={`/benefits/${b._id}/${toKebabCase(b.title)}`}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-8 border-slate-500 bg-white" />
                    <CarouselNext className="mr-8 border-slate-500 bg-white" />
                  </Carousel>
                </div>
              </div>

              <div className="mx-[32px] mt-8 md:mx-[72px]">
                <div className="font-medium text-zinc-500">
                  Recently Uploaded Fatwas
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-0 gap-[16px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4">
                  {data!.recentFatwas.map((f: Fatwa, index: number) => (
                    <Card
                      key={index}
                      title={f.title}
                      author={f.author}
                      createdAt={f.createdAt}
                      category={f.category}
                      views={f.views}
                      variant="2"
                      onClick={async () => {
                        await axiosInstance
                          .patch(`/fatwas/${f._id}/views`)
                          .then(() => {})
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      href={`/fatwas/${f._id}/${toKebabCase(f.title)}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mx-[32px] mt-8 md:mx-[72px]">
                <div className="font-medium text-zinc-500">
                  Recently Uploaded Benefits
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-0 gap-[16px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4">
                  {data!.recentBenefits.map((b: Benefit, index: number) => (
                    <Card
                      key={index}
                      title={b.title}
                      author={b.author}
                      createdAt={b.createdAt}
                      category={b.category}
                      views={b.views}
                      variant="2"
                      onClick={async () => {
                        await axiosInstance
                          .patch(`/benefits/${b._id}/views`)
                          .then(() => {})
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      href={`/benefits/${b._id}/${toKebabCase(b.title)}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
