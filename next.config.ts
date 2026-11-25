import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_BASE_PATH?.replace(/\/$/, "") ||
  (isProd ? "/resume" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["react-pdf", "pdfjs-dist"],
};

export default nextConfig;
