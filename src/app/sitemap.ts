import type { MetadataRoute } from "next";
import { getPosts, getWorks } from "@/lib/entries";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, posts] = await Promise.all([getWorks(), getPosts()]);
  const pages = [
    "/",
    "/website/",
    "/construction_industry_website/",
    "/website/corpolate/",
    "/website/service_site/",
    "/website/recruit_website/",
    "/app/",
    "/app/demo/",
    "/plan/",
    "/company/",
    "/design_all/",
    "/works/",
    "/blog/",
    "/document/",
    "/contact/",
    "/privacy-policy/",
    "/regalpage/",
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "/" ? 1 : 0.7 })),
    ...works.map((w) => ({ url: `${site.url}/${w.id}/`, lastModified: w.publishedAt })),
    ...posts.map((p) => ({ url: `${site.url}/${p.id}/`, lastModified: p.updatedAt ?? p.publishedAt })),
  ];
}
