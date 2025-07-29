/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return process.env.DISABLE_AI_MATCH === 'true' ? [
      {
        source: '/api/ai-match',
        destination: '/api/not-found',
      },
    ] : [];
  },
};

module.exports = nextConfig;
