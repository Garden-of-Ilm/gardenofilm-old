import React from "react";
import AuthLayoutStyles from "./auth-layout.module.css";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <div className={AuthLayoutStyles.headerShadow} />

      <div className={AuthLayoutStyles.headerContent}>
        <Image src="/logo.png" alt="Fatwa logo" width={100} height={100} />
        <h3>Welcome to Admin Panel</h3>
        <p>Login</p>
      </div>
      {children}
    </>
  );
}
