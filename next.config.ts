import type { NextConfig } from "next";

const repoName = "resume";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  images: { unoptimized: true },
  transpilePackages: ["react-pdf", "pdfjs-dist"],
};

export default nextConfig;
