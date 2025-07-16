/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       // ✅ And change this to localhost
  //       hostname: 'localhost',
  //       port: '8000',
  //       pathname: '/storage/**',
  //     },
  //   ],
  // },
}

export default nextConfig
