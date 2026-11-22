import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // shown in the footer as "last deployed"
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  images: {
    // Images come from whatever backend NEXT_PUBLIC_API_URL points to, so skip
    // the optimizer (and its host allow-list) and serve them as-is.
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
