import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy
 * - 静的生成（高速表示）を保つため nonce は使わず、読み込み元を最小限に絞る方式。
 * - 外部は Cloudflare Turnstile（スパム対策）と microCMS の画像配信だけを許可。
 * - vercel.live は Vercel のプレビュー環境のコメント用ツールバー。
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://images.microcms-assets.io",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://vercel.live",
  "frame-src https://challenges.cloudflare.com https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 現サイト（WordPress）と同じく末尾スラッシュ付きのURLにそろえ、検索評価をそのまま引き継ぐ
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.microcms-assets.io" }],
  },
  experimental: {
    // ビルド時に JS のハッシュを付け、配信途中の改ざんを検知する（SRI）
    sri: { algorithm: "sha256" },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // 旧ブログの月別アーカイブ・カテゴリ・フィードはブログ一覧へ
      { source: "/:year(\\d{4})/:month(\\d{2})/", destination: "/blog/", permanent: true },
      { source: "/category/:path*", destination: "/blog/", permanent: true },
      { source: "/feed/", destination: "/blog/", permanent: true },
      { source: "/site_homepage/", destination: "/website/", permanent: true },
    ];
  },
};

export default nextConfig;
