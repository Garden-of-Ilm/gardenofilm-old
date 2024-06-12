/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "@/layouts";
import FatwaList from "@/sections/user/fatwa-list";
import { useFetchFatwaList } from "@/hooks/useFetchFatwaList";
import Head from "next/head";

export default function Home() {
  const { fatwaLists, loading, setPage, page } = useFetchFatwaList();

  return (
    <>
      <Head>
        <title>Garden of ilm</title>
        <meta name="description" content="" />
      </Head>
      <BaseLayout is_heading is_showcase withMobileLogo={true}>
        <FatwaList
          loading={loading}
          page={page}
          fatwaLists={fatwaLists}
          setPage={setPage}
        />
      </BaseLayout>
    </>
  );
}
