import { useState } from "react";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";

export default function Autocomplete() {
  const router = useRouter();
  const [search, setSearch] = useState<any>("");
  const [query, setQuery] = useState("");

  const [debouncedSearch] = useDebounce(query, 100);
  const { data, error } = useSWR(
    debouncedSearch
      ? `/search/movie?query=${debouncedSearch}&include_adult=false&append_to_response=details`
      : null
  );

  if (search !== "") {
    router.push("/movie/" + search.id).then();
    setQuery("");
    setSearch("");
  }

  if (error) {
    console.error(error);
    return <h1>Something went wrong. Are you connected to the internet?</h1>;
  }

  return (
    <Combobox value={search} onChange={setSearch}>
      <Combobox.Input
        className="input-bordered input w-full text-primary"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person) => (person as any).name}
      />
      <Combobox.Options className="absolute z-50 w-full rounded-md shadow-md">
        {data?.results.slice(0, 3).map((movie: any) => (
          <Combobox.Option
            key={movie.id}
            value={movie}
            className="flex cursor-pointer gap-4 rounded-md py-2 px-2 ui-active:bg-primary ui-active:text-white ui-not-active:bg-base-200 "
          >
            <Image
              src={"https://image.tmdb.org/t/p/w92" + movie.poster_path}
              className={"w-1/6 rounded-md shadow-md"}
              alt={"Poster"}
              width={92 / 2}
              height={138 / 2}
            />
            <div className="w-5/6">
              <h3 className="mb-2 truncate text-lg font-bold">{movie.title}</h3>
              <p className="text-sm">
                <span className={"font-bold"}>
                  {parseFloat(movie.vote_average).toPrecision(2)}/10
                </span>
                <span className={"ml-2 text-xs"}>
                  ({movie.vote_count} votes)
                </span>
              </p>
            </div>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
