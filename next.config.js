/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle better-sqlite3 for server-side
      config.externals.push('better-sqlite3');
    }
    return config;
  },
  // Optimize for static export if needed
  output: 'standalone',
  
  // Handle SQLite database files
  async rewrites() {
    return [];
  },
  
  // Image optimization
  images: {
    domains: [],
  },
}

module.exports = nextConfig