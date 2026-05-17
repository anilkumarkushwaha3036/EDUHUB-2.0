import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
  /* config options here */
};

export default nextConfig;
