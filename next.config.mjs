/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
  serverExternalPackages: ["@/data/*"],
  ç,
};
export default nextConfig;
