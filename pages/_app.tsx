import React from "react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (path: any) =>
          fetch(
            `https://api.themoviedb.org/3${path}${
              path.includes("?")
                ? `&` + `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                : `?` + `api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            }`
          ).then((res) => res.json()),
      }}
    >
      <ToastContainer position="top-right" theme="dark" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
