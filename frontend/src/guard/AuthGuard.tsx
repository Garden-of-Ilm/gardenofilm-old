import React, { useContext } from "react";
import { useAuthContext } from "@/guard/AuthContext";
import AdminLoginPage from "@/pages/admin";

interface Props {
  children: React.ReactNode;
}

function AuthGuard({ children }: Props) {
  const { user } = useAuthContext();

  if (!user?.accessToken) {
    return <AdminLoginPage />;
  }
  return <>{children}</>;
}

export default AuthGuard;
