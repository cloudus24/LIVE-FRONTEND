/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  distDir: "_next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stagingapi.olysim.com",
        pathname: "**",
      },
    ],
  },
}