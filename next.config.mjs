/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standard Next.js output mode so Hostinger can find the .next directory and run "next start"
  images: {
    unoptimized: true
  },
  trailingSlash: false
};

export default nextConfig;
