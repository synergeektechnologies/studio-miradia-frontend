/** @type {import('next').NextConfig} */
// Helper function to extract backend URL pattern
function getBackendImagePattern() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  
  try {
    const url = new URL(backendUrl);
    const protocol = url.protocol.replace(':', '');
    const pattern = {
      protocol: protocol,
      hostname: url.hostname,
      pathname: '/**',
    };
    
    // Add port if specified and not default
    if (url.port && url.port !== '80' && url.port !== '443') {
      pattern.port = url.port;
    }
    
    return pattern;
  } catch (e) {
    // Fallback to localhost if URL parsing fails
    return {
      protocol: 'http',
      hostname: 'localhost',
      port: '8080',
      pathname: '/**',
    };
  }
}

const backendPattern = getBackendImagePattern();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    unoptimized: false,
    remotePatterns: [
      // Production backend domain
      {
        protocol: 'https',
        hostname: 'api.studiomiradia.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'api.studiomiradia.com',
        pathname: '/**',
      },
      // Backend URL from environment variable
      backendPattern,
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },  
  },
}

export default nextConfig
