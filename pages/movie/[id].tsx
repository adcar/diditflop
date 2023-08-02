import React from "react";
import Container from "../../components/Container";
import CountUp from "react-countup";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

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
        <h1 className={"text-6xl mb-2 sm:text-8xl font-extrabold mt-16"}>
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
    <Container className="mt-16 animate-fade">
      <div className="flex flex-col lg:flex-row gap-16 items-center ">
        <Image
          placeholder="blur"
          blurDataURL={"https://image.tmdb.org/t/p/w92" + poster_path}
          className={"rounded-xl shadow-md"}
          src={"https://image.tmdb.org/t/p/w342" + poster_path}
          alt={"Poster"}
          width={274}
          height={410}
        />
        <div>
          <h2
            className={
              "text-center lg:text-left lg:max-w-xl font-bold text-2xl md:text-4xl mb-4 "
            }
          >
            <span
              className="text-primary text-center lg:text-left "
              title={title}
            >
              {title}
            </span>{" "}
            {isFlop ? "lost" : "made"}
          </h2>
          <CountUp end={money} duration={2} separator=",">
            {({ countUpRef }) => (
              <div
                className={
                  "text-center lg:text-left block text-6xl md:text-8xl font-extrabold " +
                  (isFlop ? "text-red-500" : "text-green-500")
                }
              >
                $<span ref={countUpRef}></span>
              </div>
            )}
          </CountUp>
          <span className="mt-4 block md:w-full mx-auto w-96 text-center lg:text-left">
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

      <section className={"flex flex-col lg:items-start items-center"}>
        <h2 className="mt-16 font-extrabold text-2xl">
          Some more info...
        </h2>
        <div className="stats stats-vertical sm:stats-horizontal mt-4">
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

      {/*TODO: Recent Flops here (side by side with Some More Info on larger screens?)*/}
      {/*<section className={"mt-8"}>*/}
      {/*  <h2 className=" font-extrabold text-2xl">Recent flops</h2>*/}
      {/*</section>*/}
    </Container>
  );
}
