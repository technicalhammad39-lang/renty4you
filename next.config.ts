import type {NextConfig} from 'next';

const uploadBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || '';
let uploadHostname = '';

try {
  if (uploadBaseUrl && uploadBaseUrl.startsWith('http')) {
    const url = new URL(uploadBaseUrl);
    uploadHostname = url.hostname;
  }
} catch (e) {
  console.warn('Invalid NEXT_PUBLIC_UPLOAD_BASE_URL in environment variables.');
}

const remotePatterns: any[] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'picsum.photos',
    port: '',
    pathname: '/**',
  },
];

if (uploadHostname) {
  // Add base hostname
  remotePatterns.push({
    protocol: 'https',
    hostname: uploadHostname.replace(/^www\./, ''),
    port: '',
    pathname: '/**',
  });
  // Add www hostname
  remotePatterns.push({
    protocol: 'https',
    hostname: `www.${uploadHostname.replace(/^www\./, '')}`,
    port: '',
    pathname: '/**',
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns,
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
