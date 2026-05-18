import { paraglideWebpackPlugin } from "@inlang/paraglide-js";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.plugins.push(
      paraglideWebpackPlugin({
        outdir: "./src/paraglide",
        project: "./project.inlang",
        strategy: ["url", "cookie", "baseLocale"],
      }),
    );

    return config;
  },
};

export default nextConfig;
