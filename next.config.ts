import type { NextConfig } from "next";

const pagesBaseUrl = process.env.PAGES_BASE_URL;
const normalizedBasePath = (() => {
  if (!pagesBaseUrl) {
    return undefined;
  }

  try {
    const { pathname } = new URL(pagesBaseUrl);
    return pathname === "/" ? undefined : pathname.replace(/\/$/, "");
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath ? `${normalizedBasePath}/` : undefined,
};

export default nextConfig;
