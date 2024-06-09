import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import { baseURL } from "@/lib/axios";
import { Resource } from "@/lib/definitions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertGoogleDriveLinkToDownloadLink } from "@/lib/utils";
import Layout from "@/components/layout";

export default function Page() {
  const { isPending, error, data } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await fetch(baseURL + "/resources");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    },
  });

  return (
    <Layout>
      <Head>
        <title>Resources - Garden of Ilm</title>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
      </Head>

      <div className="bg-[#46615d] text-white">
        <div className="mx-auto max-w-7xl px-[32px] py-3 md:px-[72px]">
          <h2 className="text-xl font-semibold">Resources</h2>
        </div>
      </div>

      {isPending && (
        <div className="mt-3 px-[16px] md:px-[72px]">Loading...</div>
      )}
      <div className="mx-auto">
        {error && (
          <div className="mt-3 px-[16px] md:px-[72px]">{error.message}</div>
        )}

        {!isPending && !error && (
          <div className="bg-[#f9fbfa]">
            <div className="mx-auto min-h-screen max-w-7xl">
              <div className="mx-[32px] mx-auto min-h-screen bg-white pb-10 md:mx-[72px]">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-white">
                      <TableHead>Name</TableHead>
                      <TableHead>File Format</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((r: Resource, index: number) => {
                      return (
                        <TableRow key={index} className="hover:bg-white">
                          <TableCell>{r.name}</TableCell>
                          <TableCell>{r.fileFormat}</TableCell>
                          <TableCell className="text-right">
                            <a
                              href={convertGoogleDriveLinkToDownloadLink(
                                r.downloadUrl,
                              )}
                              className="cursor-pointer text-blue-500 underline hover:text-blue-400"
                            >
                              Download
                            </a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
