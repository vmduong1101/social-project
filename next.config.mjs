/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        formats: ['image/avif', 'image/webp'],
        remotePatterns:
        [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            }
        ]
    }
};

export default nextConfig;
