import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //remotePatterns is useful when we want to specify patterns for external image sources. When the app needs to display images that are hosted on external servers.
    remotePatterns: [
      {
        hostname: "a0.muscache.com",//domain name of the external server that is allowed to serve images.
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
