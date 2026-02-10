import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow development origins
  experimental: {
    allowedDevOrigins: ['192.168.56.1:3000', 'localhost:3000'],
  },
  
  // Allow API routes to be accessed from the same origin
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;