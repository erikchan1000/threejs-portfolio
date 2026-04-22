/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/threejs-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/threejs-portfolio/' : '',
};

module.exports = nextConfig;
