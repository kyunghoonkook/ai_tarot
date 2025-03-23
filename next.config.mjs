/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://developers.kakao.com https://t1.kakaocdn.net https://pagead2.googlesyndication.com https://*.googleadservices.com https://*.google-analytics.com https://*.googleapis.com https://*.doubleclick.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://your-ai-tarot-url.com https://*.googleusercontent.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.doubleclick.net;
    frame-src 'self' https://googleads.g.doubleclick.net https://*.googlesyndication.com;
    connect-src 'self' https://*.google-analytics.com https://*.googleapis.com https://*.doubleclick.net;
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
    // images: {
    //     domains: ['your-ai-tarot-url.com'],
    // },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    optimizeFonts: false,
};

export default nextConfig;
