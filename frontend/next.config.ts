import type { NextConfig } from "next";

const repoName = "sports_analytics";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default nextConfig;
