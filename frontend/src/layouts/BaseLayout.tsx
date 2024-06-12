import React from "react";
import { Navbar, ShowCase } from "@/components/user";

interface Props {
  children: React.ReactNode;
  is_heading?: boolean;
  is_showcase: boolean;
  withMobileLogo: boolean;
}

export default function BaseLayout({
  children,
  withMobileLogo,
  is_heading = false,
  is_showcase = false,
}: Props) {
  return (
    <>
      <Navbar withMobileLogo={withMobileLogo} />
      {is_showcase && <ShowCase is_heading={is_heading} />}
      {children}
    </>
  );
}
