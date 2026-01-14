export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/portfolio/"],
        disallow: [
          "/login",
          "/register",
          "/app",
          "/api"
        ],
      },
    ],
    sitemap: "https://deployme-dev.vercel.app/sitemap.xml",
  };
}
