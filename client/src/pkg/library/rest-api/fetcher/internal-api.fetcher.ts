import ky, { type KyInstance } from "ky";

const getInternalApiPrefix = (): string => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return `${appUrl.replace(/\/$/, "")}/api`;
};

// fetcher for Next.js Route Handlers under /api/*
export const internalApiFetcher: KyInstance = ky.create({
  prefix: getInternalApiPrefix(),
  credentials: "include",
  throwHttpErrors: false,
});
