/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Change to true only if you need unoptimized images
  },
};

export default nextConfig;
