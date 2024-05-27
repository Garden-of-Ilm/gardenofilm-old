import { Inter } from "next/font/google";
import type { AppProps } from "next/app";

import AuthContextProvider from "@/guard/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
