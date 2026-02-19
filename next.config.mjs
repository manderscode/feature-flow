/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Set to false in production to catch type errors
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
