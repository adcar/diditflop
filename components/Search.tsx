import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const { value } = (e.target as any).movie;
    if (!value) {
      return router
        .push("/")
        .then()
        .catch(() => {
          toast.error("Something went wrong.");
        });
    }
    router
      .push("/movie/" + (e.target as any).movie.value)
      .then()
      .catch(() => {
        toast.error("Something went wrong.");
      });
  }

  return (
    <LayoutGroup>
      <div
        className={
          "flex h-12 w-full items-center gap-4 container mx-auto px-4 " +
          (isHome ? "flex-col h-screen items-center justify-center" : "mt-4")
        }
      >
        <Link href="/">
          <a>
            <motion.h1
              layout
              transition={{ duration: 0.5, type: "tween" }}
              className={
                "font-extrabold whitespace-nowrap " +
                (isHome ? "text-5xl sm:text-6xl" : "sm:text-2xl text-lg")
              }
            >
              Did it <span className="text-primary">Flop</span>?
            </motion.h1>
          </a>
        </Link>
        <motion.form
          onSubmit={handleSubmit}
          layout
          transition={{ duration: 0.5, type: "tween" }}
          style={{
            width: isHome ? 500 : 260,
            maxWidth: "100%",
            marginTop: isHome ? 16 : 0,
          }}
        >
          <input
            id="movie"
            type="text"
            placeholder="Start searching for a movie..."
            className={"w-full  input input-bordered text-primary"}
          />
        </motion.form>
      </div>
    </LayoutGroup>
  );
}
