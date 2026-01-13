import { getAllUsernames } from "@/utils/data";

export default async function sitemap() {
  const usernames = await getAllUsernames();

  const baseUrl = "https://localhost:3000";

  return [
    // Optional: homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // All portfolio pages
    ...usernames.map((username) => ({
      url: `${baseUrl}/portfolio/${username}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
