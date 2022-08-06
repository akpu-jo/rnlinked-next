/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "pbs.twimg.com", 'res.cloudinary.com', "rnlinkedbucket.s3.eu-west-2.amazonaws.com"]
  },
  experimental: {
    scrollRestoration: true
  },
}

module.exports = nextConfig
