/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://developers.kakao.com https://t1.kakaocdn.net https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://*.googleadservices.com https://tpc.googlesyndication.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleapis.com https://*.doubleclick.net https://*.g.doubleclick.net https://www.google.com https://www.googletagmanager.com https://*.adtrafficquality.google https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://www.aifree-tarot.com https://*.googleusercontent.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.doubleclick.net https://*.ggpht.com https://pagead2.googlesyndication.com https://www.google.com https://www.google.co.kr https://tpc.googlesyndication.com;
    frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://tpc.googlesyndication.com;
    connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googleapis.com https://*.doubleclick.net https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://adservice.google.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://*.adtrafficquality.google https://www.google.com https://www.google.co.kr https://www.googletagmanager.com;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
`;

const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ];
    },
    images: {
        domains: ['www.aifree-tarot.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    optimizeFonts: true,
    poweredByHeader: false,
    compress: true,
};

export default nextConfig;
