import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/guard/AuthContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
