/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This ensures that the static export works even when deployed to a subdirectory
  basePath: '',
  // Disable server-side features that aren't compatible with static exports
  trailingSlash: true,
}

export default nextConfig
