import MovieDB from "node-themoviedb";
export const tmdb = new MovieDB(process.env.NEXT_PUBLIC_TMDB_API_KEY as string);
