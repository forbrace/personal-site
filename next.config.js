/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt", "ru"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://csscraftsman.com',
        permanent: false,
        basePath: false,
      },
    ]
  },
};

module.exports = nextConfig;
