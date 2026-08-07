import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Short, shareable English entry point → canonical English book page.
      // Temporary (307) so it can later become an English index if more
      // English titles are added.
      {
        source: "/en",
        destination: "/en/shadows-over-domburg",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
