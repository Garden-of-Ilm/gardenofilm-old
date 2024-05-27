import { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";

import Bars3Icon from "@/icons/bars-3";
import XMarkIcon from "@/icons/x-mark";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const LINKS = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/fatwas",
    label: "Fatwas",
  },
  {
    path: "/benefits",
    label: "Benefits",
  },
  {
    path: "/resources",
    label: "Resources",
  },
  {
    path: "/about",
    label: "About",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {/* Header for larger screens */}
      <header className="hidden py-2 md:block">
        <div
          className={clsx(
            "fixed left-[-250%] top-0 z-10 mx-auto block h-[100vh] w-full max-w-sm items-center bg-white md:relative md:left-0 md:flex md:h-fit md:max-w-7xl md:bg-white md:px-[72px]",
            {
              "!left-0": isOpen,
            },
          )}
        >
          <div className="w-1/4 text-lg">
            <Image
              className=""
              src="/logo.png"
              alt="Garden of Ilm logo"
              width={64}
              height={64}
            />
          </div>

          <div className="flex w-1/2 w-full justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {LINKS.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Link href={link.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={clsx(navigationMenuTriggerStyle(), {
                          "bg-slate-300/75 hover:bg-slate-300/75 focus:bg-slate-300/75":
                            router.pathname === link?.path,
                        })}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="w-1/4 text-end text-xs">
            <span className="font-medium text-zinc-500">Supervisor:</span>
            <br />
            <span className="font-medium opacity-80">Abdulaziz Al-Haqqan</span>
          </div>
        </div>
      </header>
      {/* Header for mobile screens */}
      <header className="md:hidden">
        <div
          className={clsx(
            "fixed left-[-250%] top-0 z-10 mx-auto block h-[100vh] w-full max-w-sm items-center bg-white md:relative md:left-0 md:flex md:h-fit md:max-w-7xl md:bg-white md:px-[72px]",
            {
              "!left-0": isOpen,
            },
          )}
        >
          {isOpen && (
            <div className="mt-4 flex items-end px-[8px]">
              <div className="grow"></div>
              <div className="w-fit">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className=""
                >
                  <XMarkIcon className="h-12 w-12 px-1 active:rounded active:bg-neutral-200" />
                </button>
              </div>
            </div>
          )}
          <div className="my-3 mb-4">
            <Image
              className="mx-auto block md:hidden"
              src="/logo.png"
              alt="Garden of Ilm logo"
              width={80}
              height={80}
            />
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-0 divide-y divide-slate-400 border-y border-slate-400 md:flex md:flex-row md:gap-[42px] md:divide-none md:border-0 lg:w-1/2">
            {LINKS.map((link) => (
              <Link
                href={link.path}
                key={link.path}
                className={clsx(
                  "w-full bg-white px-[24px] py-[20px] text-center font-bold text-[#00000066] hover:text-[#66513e] md:w-fit md:px-0 md:py-0",
                  {
                    "text-[#66513e]": router.pathname === link?.path,
                  },
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 w-full text-center text-[12.5px]">
            <span className="font-medium text-zinc-500">Supervisor:</span>
            <br />
            <span className="font-medium opacity-80">Abdulaziz Al-Haqqan</span>
          </div>
          <div
            className="absolute right-[-100%] top-0 z-[-1] block h-[100%] w-[100%] bg-[#090909aa] md:hidden"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="flex max-w-7xl items-center justify-between py-2">
          <div className="w-1/4 pl-[16px]">
            <button type="button" onClick={() => setOpen(true)}>
              <Bars3Icon className="h-11 w-11 px-1 active:rounded active:bg-neutral-200" />
            </button>
          </div>
          <div className="w-1/2">
            <Image
              className="mx-auto"
              src="/logo.png"
              alt="Garden of Ilm logo"
              width={56}
              height={56}
            />
          </div>
          <div className="w-1/4"></div>
        </div>
      </header>
    </>
  );
}
