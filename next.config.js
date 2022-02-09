const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");
const CompressionPlugin = require("compression-webpack-plugin");
// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app cdn.jsdelivr.net www.googletagmanager.com www.google-analytics.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com cdn.jsdelivr.net *.fontawesome.com;
  img-src * blob: data:;
  media-src cdn.jsdelivr.net;
  connect-src *;
  font-src 'self' fonts.gstatic.com cdn.jsdelivr.net *.fontawesome.com fonts.googleapis.com;
  frame-src giscus.app
`;

const securityHeaders = [
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\n/g, ""),
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
];

module.exports = withPWA(
    withBundleAnalyzer({
        pwa: {
            dest: "public",
            disable: process.env.NODE_ENV === "development",
        },
        reactStrictMode: true,
        pageExtensions: ["js", "jsx", "md", "mdx"],
        eslint: {
            dirs: ["pages", "components", "lib", "layouts", "scripts"],
        },
        async headers() {
            return [
                {
                    source: "/(.*)",
                    headers: securityHeaders,
                },
            ];
        },
        webpack: (config, { dev, isServer }) => {
            config.plugins.push(new CompressionPlugin());
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|mp4)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: "/_next",
                            name: "static/media/[name].[hash].[ext]",
                        },
                    },
                ],
            });

            config.module.rules.push({
                test: /\.svg$/,
                issuer: /\.(js|ts)x?$/,
                use: ["@svgr/webpack"],
            });

            if (!dev && !isServer) {
                // Replace React with Preact only in client production build
                Object.assign(config.resolve.alias, {
                    "react/jsx-runtime.js": "preact/compat/jsx-runtime",
                    react: "preact/compat",
                    "react-dom/test-utils": "preact/test-utils",
                    "react-dom": "preact/compat",
                });
            }

            return config;
        },
    })
);
