import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import LogoutModalButton from "./logout-modal-button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  {
    path: "/admin/fatwas",
    label: "Fatwas",
  },
  {
    path: "/admin/benefits",
    label: "Benefits",
  },
  {
    path: "/admin/resources",
    label: "Resources",
  },
  {
    path: "/admin/categories",
    label: "Categories",
  },
];

export default function AdminNavbar() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="fixed hidden h-full w-1/6 flex-col border-r border-slate-300 md:flex">
        <div className="py-3">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="Garden of Ilm logo"
            className="mx-auto"
          />
        </div>
        <div className="flex flex-col divide-y divide-slate-300 border-y border-slate-300">
          {LINKS.map((link) => (
            <Link
              key={link.path}
              className={clsx("p-3", {
                "bg-slate-200 text-slate-900": router.pathname == link.path,
                "hover:bg-slate-100": router.pathname !== link.path,
              })}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="grow"></div>
        <div className="pt-9 text-center">
          <LogoutModalButton />
        </div>
      </div>
      <div className="flex border-b py-2 md:hidden">
        <div className="w-1/4"></div>
        <div className="w-1/2">
          <Image
            className="mx-auto cursor-pointer"
            src="/logo.png"
            alt="Garden of Ilm logo"
            width={56}
            height={56}
            onClick={() => router.push("./")}
          />
        </div>
        <div className="w-1/4 pr-[16px] text-end">
          {isOpen ? (
            <button type="button" onClick={() => setOpen(false)}>
              <X className="h-11 w-11 px-1 active:rounded active:bg-neutral-200" />
            </button>
          ) : (
            <button type="button" onClick={() => setOpen(true)}>
              <Menu className="h-11 w-11 px-1 active:rounded active:bg-neutral-200" />
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col bg-white md:hidden">
          <div className="flex flex-col divide-y divide-slate-300">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                className={clsx("p-3", {
                  "bg-slate-200 text-slate-900": router.pathname == link.path,
                  "hover:bg-slate-100": router.pathname !== link.path,
                })}
                href={link.path}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="grow"></div>
          <div className="border-b border-slate-300">
            <LogoutModalButton />
          </div>
        </div>
      )}
    </>
  );
}
