import useSWR from "swr";
import fetchJson from "../lib/fetchJson";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function RecentFlops() {
  const { data, error } = useSWR<{ data: any; message: string }>(
    "/api/recent-flops",
    fetchJson
  );

  if (error) {
    return <></>;
  }
  if (!data) {
    return <></>;
  }

  return (
    <ul className="flex shrink-0 items-center gap-8 overflow-x-auto ">
      {data.data.map(
        (movie: {
          id: number;
          loss: number;
          poster_path: string;
          title: string;
          year: number;
        }) => (
          <Link key={movie.id} href={"/movie/" + movie.id}>
            <Image
              placeholder="blur"
              blurDataURL={"https://image.tmdb.org/t/p/w92" + movie.poster_path}
              className={
                "relative cursor-pointer rounded-xl shadow-md transition-all hover:scale-110 hover:shadow-xl "
              }
              src={"https://image.tmdb.org/t/p/w92" + movie.poster_path}
              alt={movie.title + " Movie Poster"}
              width={92}
              height={138}
            />
          </Link>
        )
      )}
    </ul>
  );
}
