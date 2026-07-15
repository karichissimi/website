import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The investor deck PDF lives outside /public and is served by the API
  // route after password check — make sure it ships with the serverless bundle.
  outputFileTracingIncludes: {
    "/api/investordeck": ["./private/**/*"],
  },
};

export default nextConfig;
