import type {NextPage} from "next";
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
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <div className="container mx-auto flex items-center justify-center mt-8 md:mt-32">
                {" "}
                <div className="flex flex-col items-center">
                    <div className="md:w-[750px] items-center flex flex-col">
                        <h1 className="md:text-8xl lg:text-9xl text-6xl sm:text-7xl mt-4 font-extrabold text-center">
                            Did it <span className="text-primary">Flop</span>?
                        </h1>
                        <input
                            type="text"
                            placeholder="Start searching for a movie..."
                            className="input w-2/3 mt-12 input-bordered "
                        />
                        <p className="w-2/3 mt-8 text-xs px-4"><strong>Did it Flop</strong> let's you quickly find
                            out if a movie was a box-office flop, and just how much money it lost (or made!).</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
