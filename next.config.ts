import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false, // Gunakan true jika ingin redirect permanen (301)
      },
    ];
  },
};

export default nextConfig;
