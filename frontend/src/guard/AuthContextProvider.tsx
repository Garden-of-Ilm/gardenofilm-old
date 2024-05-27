import React, { useCallback, useEffect, useState } from "react";
import { AuthContext, IUser } from "@/guard/AuthContext";
import axiosInstance from "@/lib/axios";
import { LoginRes } from "@/lib/definitions";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>();
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setErrorMessage(null);
    await axiosInstance
      .post<LoginRes>("/auth/login", { password, email })
      .then((res) => {
        const data = res.data.data;
        const accessToken = res.data.accessToken;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        setUser({ ...data, accessToken });
        router.push("/admin/fatwas");
      })
      .catch((err: any) => {
        setErrorMessage(err?.response?.data?.message ?? "Something went wrong");
      });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const isInitialized = useCallback(() => {
    if (typeof window === "undefined") return;
    const userDataString = localStorage.getItem("user");
    const accessTokenString = localStorage.getItem("accessToken");
    if (userDataString && accessTokenString) {
      const accessToken = JSON.parse(accessTokenString);
      const userData = JSON.parse(userDataString);
      if (isTokenExpired(accessToken)) {
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      setUser({ ...userData, accessToken });
    }
  }, []);

  useEffect(() => {
    isInitialized();
  }, [isInitialized]);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logOut,
        error: errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
