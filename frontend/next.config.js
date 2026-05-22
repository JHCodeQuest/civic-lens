/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/civic-lens",
  assetPrefix: "/civic-lens",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
