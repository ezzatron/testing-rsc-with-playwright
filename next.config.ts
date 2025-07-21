import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/pokemans",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

function withBundleAnalyzer(config: NextConfig): NextConfig {
  return process.env.ANALYZE === "true"
    ? bundleAnalyzer({ openAnalyzer: false })(config)
    : config;
}
