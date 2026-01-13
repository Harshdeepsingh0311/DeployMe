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
    sitemap: "https://localhost:3000/sitemap.xml",
  };
}
