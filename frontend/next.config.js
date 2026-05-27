/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // GitHub Pages serves project pages from a subpath (/civic-lens).
  // NEXT_PUBLIC_BASE_PATH is set in the GitHub Actions workflow.
  // During local dev (no env var), basePath is empty — no subpath needed.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Static export doesn't support Next.js image optimization.
  images: {
    unoptimized: true,
  },

  // Prevent trailing slash redirects — GitHub Pages serves index.html
  // at both /path and /path/; skipTrailingSlashRedirect avoids issues.
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
