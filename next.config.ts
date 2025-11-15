import path from "node:path";
import type { NextConfig } from "next";
import { s3Url } from "./src/env/s3Url";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL(`${s3Url}/**`),
    ],
  },
};

export default nextConfig;
