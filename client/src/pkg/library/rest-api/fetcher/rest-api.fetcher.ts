import ky, { type KyInstance } from "ky";

// fetcher
export const restApiFetcher: KyInstance = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});
