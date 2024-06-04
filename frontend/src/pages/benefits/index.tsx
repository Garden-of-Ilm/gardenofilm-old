import { FormEvent } from "react";

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import axiosInstance, { baseURL } from "@/lib/axios";
import { Benefit } from "@/lib/definitions";

import Card from "@/components/card";
import DataNotFound from "@/components/data-not-found";
import PaginationMenu from "@/components/pagination-menu";

import CategoriesMenu from "@/components/categories-menu";
import { Search } from "lucide-react";
import { toKebabCase } from "@/lib/utils";
import Layout from "@/components/layout";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { push } = useRouter();

  const params = new URLSearchParams(searchParams);

  const page = (searchParams.get("page") ?? 1) as number;
  const q = searchParams.get("q") ?? "";
  const categories = searchParams.get("category") ?? "";

  const { isPending, error, data } = useQuery({
    queryKey: [page, q, categories],
    queryFn: async () => {
      const params = `limit=15&page=${page}&q=${q}&category=${categories}`;

      const response = await fetch(`${baseURL}/benefits?${params}`);
      const response2 = await fetch(`${baseURL}/categories?sort=name`);

      if (!response.ok || !response2.ok) {
        throw new Error("Network response was not ok");
      }

      const data1 = await response.json();
      const data2 = await response2.json();

      return {
        benefits: data1.benefits,
        paging: data1.paging,
        categories: data2,
      };
    },
  });

  function handleSearch(term: string) {
    term ? params.set("q", term) : params.delete("q");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    params.set("page", "1");
    push(`/benefits?${params.toString()}`);
  }

  return (
    <Layout>
      <Head>
        <title>Benefits - Garden of Ilm</title>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
      </Head>

      <div className="bg-[#46615d] text-white">
        <div className="mx-auto max-w-7xl px-[32px] py-3 md:px-[72px]">
          <h2 className="text-xl font-semibold">Benefits</h2>
        </div>
      </div>

      <div className="min-h-[800px] bg-[#f9fbfa]">
        <div className="mx-auto h-screen max-w-7xl">
          {!isPending && !error && (
            <>
              <div className="mx-[16px] flex pt-8 md:mx-[72px] md:space-x-4 md:pt-6">
                <form
                  method="get"
                  className="w-full md:w-3/4"
                  onSubmit={handleSubmit}
                >
                  <div className="relative">
                    <input
                      className="w-full rounded-3xl border border-slate-400 px-6 py-3 shadow-sm"
                      type="text"
                      placeholder="Search benefits"
                      onChange={(e) => handleSearch(e.target.value)}
                      defaultValue={q}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl px-3 py-1.5"
                    >
                      <Search className="h-6 w-6 text-slate-900" />
                    </button>
                  </div>
                </form>
                <div className="md:w-1/4"></div>
              </div>

              <div className="mx-[16px] md:mx-[72px] md:w-3/4">
                {isPending && <div className="mt-6">Loading...</div>}

                {error && <div className="mt-6">{(error as any).message}</div>}

                {router.query?.q && (
                  <div className="mt-5">
                    Search results for <strong>{router.query.q}</strong>
                  </div>
                )}

                {router.query.category && (
                  <div className="mt-5">
                    Results for category:{" "}
                    <strong>{router.query.category}</strong>
                  </div>
                )}
              </div>

              <div className="mx-0 mt-6 flex flex-col pb-6 md:mx-[72px] md:flex-row md:space-x-4">
                <div className="w-full md:w-3/4">
                  {data?.benefits?.length == 0 && <DataNotFound />}

                  <div className="grid grid-cols-1 px-0 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                    {data?.benefits?.map((b: Benefit, index: number) => (
                      <Card
                        key={index}
                        title={b.title}
                        author={b.author}
                        createdAt={b.createdAt}
                        category={b.category}
                        views={b.views}
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

                  <div className="mx-[16px] mb-12 mt-8 md:mx-[72px] md:w-3/4">
                    {data?.benefits?.length !== 0 && (
                      <PaginationMenu
                        subdirectory="benefits"
                        page={data?.paging.page}
                        perPage={data?.paging.perPage}
                        pages={data?.paging.pages}
                        total={data?.paging.total}
                      />
                    )}
                  </div>
                </div>
                <div className="mb-6 mt-6 w-full px-[16px] md:mx-0 md:mb-0 md:mt-0 md:w-1/4">
                  <CategoriesMenu
                    subdirectory="benefits"
                    categories={data.categories}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
