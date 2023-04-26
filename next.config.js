/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt", "ru"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
