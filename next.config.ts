import type { NextConfig } from 'next';

const assetOrigin = 'https://motoria-autopecas.flavia-panegossi.chatgpt.site';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/products/mando/:path*', destination: `${assetOrigin}/products/mando/:path*` },
      { source: '/rafa-auto-pecas-logo.png', destination: `${assetOrigin}/rafa-auto-pecas-logo.png` },
      { source: '/rafa-auto-pecas-fachada.jpg', destination: `${assetOrigin}/rafa-auto-pecas-fachada.jpg` },
      { source: '/og.png', destination: `${assetOrigin}/og.png` },
      { source: '/favicon.png', destination: `${assetOrigin}/favicon.png` }
    ];
  }
};

export default nextConfig;
