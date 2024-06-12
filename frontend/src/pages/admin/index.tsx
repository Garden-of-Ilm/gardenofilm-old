import React, { useEffect } from "react";
import AuthLayout from "@/layouts/auth-layout";
import LoginForm from "@/sections/login-form";
import { useAuthContext } from "@/guard/AuthContext";
import { useRouter } from "next/router";

export default function AdminLoginPage() {
  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      push("/admin/fatwa-list");
    }
  }, [user]);
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
