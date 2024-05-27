import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import LogoutModalButton from "./logout-modal-button";

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

  return (
    <div className="fixed flex h-[100vh] w-1/6 flex-col border-r border-slate-300">
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
  );
}
