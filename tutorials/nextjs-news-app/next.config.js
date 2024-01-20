/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d22jarg6txugut.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.kinja-img.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img-cdn.tnwcdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "thenextweb.com",
        port: "",
      },
    ],
  },
  nextConfig,
};
