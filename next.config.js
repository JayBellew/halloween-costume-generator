/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This is important for static export
  images: {
    unoptimized: true
  },
  distDir: 'out'
}

module.exports = nextConfig
