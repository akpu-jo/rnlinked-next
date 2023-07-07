/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',

});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["lh3.googleusercontent.com", "pbs.twimg.com", 'res.cloudinary.com', "rnlinkedbucket.s3.eu-west-2.amazonaws.com"]
  },
  experimental: {
    scrollRestoration: true
  },

}

module.exports = withPWA(nextConfig)
