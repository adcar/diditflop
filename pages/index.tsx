import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Did it Flop?</title>
        <meta
          name="description"
          content="Find out if your favorite movie was a box-office flop!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto mt-4">
        {" "}
        <div className="flex flex-col items-center">
          <div className="w-[800px] items-center flex flex-col">
            <h1 className="text-9xl mt-4 font-extrabold">
              Did it <span className="text-primary">Flop</span>?
            </h1>
            <input
              type="text"
              placeholder="Start searching for a movie..."
              className="input w-2/3 mt-12 input-bordered "
            />
            <h2 className="font-bold text-6xl mt-56">Recent flops</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
