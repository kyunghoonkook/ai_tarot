/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://developers.kakao.com https://t1.kakaocdn.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://your-ai-tarot-url.com;
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
        domains: ['your-ai-tarot-url.com'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
