import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

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
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
