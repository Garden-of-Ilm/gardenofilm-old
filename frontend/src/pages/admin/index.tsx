import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAuthContext } from "@/guard/AuthContext";

import LoginForm from "@/components/login-form";

export default function AdminLoginPage() {
  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      push("/admin/fatwas");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center pt-0 md:pt-8">
      <LoginForm />
    </div>
  );
}
