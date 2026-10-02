/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first, WebP fallback: noticeably smaller hero and card photos on phones.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
