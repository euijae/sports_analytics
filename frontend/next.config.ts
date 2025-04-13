import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = "sports_analytics";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  trailingSlash: true
};

export default nextConfig;
