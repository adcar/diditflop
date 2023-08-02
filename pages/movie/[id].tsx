import React from "react";
import Container from "../../components/Container";
import CountUp from "react-countup";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import RecentFlops from "../../components/RecentFlops";

function formatToUnits(number: number, precision: number) {
  const abbrev = ["", "K", "M", "B", "T"];
  const notRangedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(notRangedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return (
    parseFloat(
      (number / Math.pow(10, order * 3)).toFixed(precision)
    ).toString() + suffix
  );
}

export default function Movie() {
  const router = useRouter();
  const { query } = router;
  const { data, error } = useSWR(query.id ? "/movie/" + query.id : null);

  if (error) {
    return (
      <Container>
        <h1 className={"mb-2 mt-16 text-6xl font-extrabold sm:text-8xl"}>
          Uh oh!
        </h1>
        <p>
          Something went wrong when trying to load this page. Sorry about that!
        </p>
      </Container>
    );
  }

  if (!data) {
    return <></>;
  }
  const { title, poster_path, revenue, budget, vote_average } = data;
  const isFlop = revenue - budget < 0;
  const money = Math.abs(revenue - budget);
  const scoreAsPercentage = Math.round((vote_average / 10) * 100);

  return (
    <>
      <Container className="animate-fade mt-16 lg:mt-32">
        <div className="flex flex-col items-center gap-16 lg:flex-row ">
          <Image
            placeholder="blur"
            blurDataURL={"https://image.tmdb.org/t/p/w92" + poster_path}
            className={"rounded-xl shadow-md"}
            src={"https://image.tmdb.org/t/p/w342" + poster_path}
            alt={title + " Movie Poster"}
            width={274}
            height={410}
          />
          <div>
            <h2
              className={
                "mb-4 text-center text-2xl font-bold md:text-4xl lg:max-w-xl lg:text-left "
              }
            >
              <span
                className="text-center text-primary lg:text-left "
                title={title}
              >
                {title}
              </span>{" "}
              {isFlop ? "lost" : "made"}
            </h2>

            <div
              className={
                "block text-center text-4xl font-extrabold md:text-5xl lg:text-left lg:text-6xl xl:text-8xl " +
                (isFlop ? "text-red-500" : "text-green-500")
              }
            >
              $
              <span>
                <CountUp end={money} duration={2} separator="," />
              </span>
            </div>

            <span className="mx-auto mt-4 block w-96 text-center md:w-full lg:text-left">
              Or in other words:
              <span
                className={
                  "ml-1 font-bold text-red-500 " +
                  (isFlop ? "text-red-500" : "text-green-500")
                }
              >
                ${formatToUnits(money, 2)}
              </span>
              .{" "}
              {isFlop
                ? "And that's not accounting for the marketing budget!"
                : "Keep in mind this doesn't account for the marketing budget."}
            </span>
          </div>
        </div>

        <section className={"flex flex-col items-center lg:items-start"}>
          <h2 className="mt-16 text-2xl font-extrabold lg:mt-32">More Info</h2>
          <div className="stats stats-vertical mt-4 sm:stats-horizontal">
            <div className="stat sm:pl-0">
              <div className="stat-value text-orange-500">
                ${formatToUnits(budget, 0)}
              </div>
              <div className="stat-title text-orange-500">Budget</div>
            </div>

            <div className="stat">
              <div className="stat-value text-green-500">
                ${formatToUnits(revenue, 0)}
              </div>
              <div className="stat-title text-green-500">Revenue</div>
            </div>
            <div className="stat">
              <div
                className={
                  "stat-value " +
                  (scoreAsPercentage >= 70
                    ? "text-green-500"
                    : scoreAsPercentage <= 40
                    ? "text-red-500"
                    : "text-orange-500")
                }
              >
                {scoreAsPercentage}%
              </div>
              <div
                className={
                  "stat-title " +
                  (scoreAsPercentage >= 70
                    ? "text-green-500"
                    : scoreAsPercentage <= 40
                    ? "text-red-500"
                    : "text-orange-500")
                }
              >
                User Score
              </div>
            </div>
          </div>
        </section>

        <section className={"mt-32"}>
          <h2 className=" mb-8 text-2xl font-extrabold">Recent flops</h2>
          <RecentFlops />
        </section>
      </Container>

      <footer className={"mt-32 mb-4"}>
        <Container>
          Created by{" "}
          <a
            className={"font-semibold hover:underline"}
            href="https://acardosi.dev/"
          >
            Alexander
          </a>{" "}
          & Rahavee Cardosi. Powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            className={"font-semibold hover:underline"}
          >
            The Movie DB
          </a>
          .
        </Container>
      </footer>
    </>
  );
}
