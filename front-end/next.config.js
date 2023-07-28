/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  //   webpack: (config, { isServer }) => {
  //     // Fixes npm packages that depend on `fs` module
  //     if (!isServer) {
  //       config.node = {
  //         fs: "empty",
  //       };
  //     }
  //     return config;
  //   },
};

module.exports = nextConfig;
