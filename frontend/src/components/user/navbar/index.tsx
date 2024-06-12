import React, { useState } from "react";
import NavbarStyles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import BarsIcon from "../../../icons/bars.icon";
import Image from "next/image";

interface Props {
  withMobileLogo: boolean;
}

function Navbar({ withMobileLogo }: Props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const navbar_configs = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about-us",
      label: "Who are we?",
    },
  ];

  return (
    <header
      className={
        NavbarStyles.header + `  ${isOpen && NavbarStyles.headerActive}`
      }
    >
      <div className="container flex items-center justify-between">
        <Image src="/logo.png" alt="Fatwa logo" width={56} height={56} />
        <Link
          href="/about-us"
          className="text-[#4E3E2F] hidden md:inline-block"
        >
          Supervisor <span className="font-bold">Abdul Aziz al Haqqan</span>
        </Link>

        <div className="flex items-center gap-[56px]">
          {navbar_configs.map((nav_config) => (
            <Link
              href={nav_config.path}
              key={nav_config.path}
              className={`${NavbarStyles.header_link} ${
                router.pathname === nav_config?.path && NavbarStyles.active
              }`}
            >
              {nav_config.label}
            </Link>
          ))}
        </div>
        <span className={NavbarStyles.overlay} onClick={() => setOpen(false)} />
      </div>
      <div className="container">
        <button type="button" onClick={() => setOpen(true)}>
          <BarsIcon />
        </button>
        <Link
          href={"/"}
          className={
            withMobileLogo
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        >
          <Image src="/logo.png" alt="Fatwa logo" width={56} height={56} />
        </Link>
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
