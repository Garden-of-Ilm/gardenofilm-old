import { Rubik } from "next/font/google";
import Head from "next/head";

import clsx from "clsx";

import Navbar from "@/components/navbar";
import Layout from "@/components/layout";

const rubik = Rubik({ subsets: ["latin"] });

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>About - Garden of Ilm</title>
        <meta charSet="utf-8" />
      </Head>

      <div className="bg-[#46615d] text-white">
        <div className="mx-auto max-w-7xl px-[32px] py-3 md:px-[72px]">
          <h2 className="text-xl font-semibold">About</h2>
        </div>
      </div>

      <div className="bg-[#f9fbfa]">
        <div className="mx-auto w-full max-w-7xl px-[32px] py-5 md:px-[72px]">
          <div className="">
            <p className="mb-2 leading-7">
              Garden of Ilm is a platform containing fatwas and benefits from
              the &apos;ulema. We follow the Qur&apos;an and the sunnah of the
              Messenger of Allah (ﷺ) based on the understanding of the
              Companions, Tabi&apos;in, and Tabi&apos; Al-Tabi&apos;in.
            </p>
          </div>

          <div className="mx-auto mt-8 w-full rounded bg-[#2F3E46] px-4 py-4 text-white md:w-3/5">
            <span className="mt-[24px] w-full text-center tracking-wide text-white">
              The Prophet (ﷺ) said,
            </span>
            <p className="my-3 border-l border-white pl-3 text-sm font-light">
              The best people are those of my generation, and then those who
              will come after them, and then those who will come after them.
            </p>
            <p className="text-sm font-light text-[#b8c8d0ff]">
              Sahih Al-Bukhari 6429
            </p>
          </div>

          <div className="mx-auto mt-8 w-full rounded bg-[#2F3E46] px-4 py-4 text-white md:w-3/5">
            <span className="mt-[24px] w-full text-center tracking-wide text-white">
              Ibn Sirin (<span className={rubik.className}>رحمه الله</span>)
              said,
            </span>
            <p className="my-3 border-l border-white pl-3 text-sm font-light">
              This knowledge is a religion, so consider from whom you receive
              your religion.
            </p>
            <p className="text-sm font-light text-[#b8c8d0ff]">
              Mishkat Al-Masabih 273
            </p>
          </div>

          <div className="mb-8 mt-8">
            <p>
              Garden of Ilm is supervised by Sheikh Abu Al-Qamar Abdulaziz
              Al-Haqqan (
              <span className={clsx(rubik.className, "text-[14px]")}>
                حفظه الله
              </span>
              ). His teachers include:
            </p>
            <div className="mt-3">
              <ul className="list-disc space-y-1 text-[15px]">
                <li className="ml-[25px] pl-1">
                  Sheikh Muhammad Hisham Al-Tahiri
                </li>
                <li className="ml-[25px] pl-1">Sheikh Salih Al-Suhaymi</li>
                <li className="ml-[25px] pl-1">Sheikh Sulayman Al-Ruhayli</li>
                <li className="ml-[25px] pl-1">
                  Sheikh &apos;Ali Al-Tuwayjiri
                </li>
                <li className="ml-[25px] pl-1">
                  Sheikh &apos;Abd Al-Razzaq Al-Badr
                </li>
                <li className="ml-[25px] pl-1">Sheikh &apos;Isam Al-Isnani</li>
                <li className="ml-[25px] pl-1">Sheikh Falah Al-Mundakar</li>
                <li className="ml-[25px] pl-1">Sheikh Salih Al-Sindhi</li>
                <li className="ml-[25px] pl-1">
                  Sheikh Dagash Ibn Shabib Al-&apos;Ajmi
                </li>
              </ul>
              <div className="mt-3">
                May Allah preserve and have mercy on them.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
