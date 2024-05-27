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
import Navbar from "@/components/navbar";

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
    <>
      <Head>
        <title>Resources - Garden of Ilm</title>
        <meta name="description" content="" />
      </Head>

      <Navbar />

      <div className="bg-[#e9ded3]">
        <div className="mx-auto max-w-7xl px-[32px] py-3 md:px-[72px]">
          <h2 className="text-xl font-bold">Resources</h2>
        </div>
      </div>

      <div className="mx-auto bg-slate-50">
        {isPending && (
          <div className="mt-3 px-[16px] md:px-[72px]">Loading...</div>
        )}

        {error && (
          <div className="mt-3 px-[16px] md:px-[72px]">{error.message}</div>
        )}

        {!isPending && !error && (
          <div className="mx-auto h-screen max-w-7xl">
            <div className="mx-[32px] mx-auto mb-10 h-fit h-screen bg-white md:mx-[72px]">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-white">
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((r: Resource, index: number) => {
                    return (
                      <TableRow key={index} className="hover:bg-white">
                        <TableCell>{r.name}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={r.downloadUrl}
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
        )}
      </div>
    </>
  );
}
