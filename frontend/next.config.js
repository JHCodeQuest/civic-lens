/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/civic-lens" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/civic-lens" : "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
