import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Did it flop?</title>
        <meta
          name="description"
          content="Find out if your favorite movie was a box-office flop!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto mt-4">
        {" "}
        <h1 className="text-9xl font-extrabold">Did it Flop?</h1>
      </div>
    </div>
  );
};

export default Home;
