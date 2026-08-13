/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages static export mode ke liye
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
