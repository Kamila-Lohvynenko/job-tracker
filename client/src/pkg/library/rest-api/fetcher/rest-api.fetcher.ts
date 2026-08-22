import ky, { type KyInstance } from "ky";

import { localizeHref } from "@/paraglide/runtime";
import { ERoutes } from "@/shared/routes";

const isAuthApiRequest = (url: string): boolean => {
  return new URL(url).pathname.includes("/auth/");
};

// fetcher
export const restApiFetcher: KyInstance = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  throwHttpErrors: false,
  hooks: {
    afterResponse: [
      ({ request, response }) => {
        const isUnauthorized = response.status === 401;

        if (
          isUnauthorized &&
          typeof window !== "undefined" &&
          !isAuthApiRequest(request.url)
        ) {
          window.location.href = localizeHref(ERoutes.SIGNIN);
        }
      },
    ],
  },
});
