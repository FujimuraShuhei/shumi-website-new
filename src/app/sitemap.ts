import type { MetadataRoute } from "next";
import { getColumns, getWorks } from "@/lib/microcms";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [works, posts] = await Promise.all([getWorks(), getColumns()]);
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
    ...posts.map((p) => ({ url: `${site.url}/${p.id}/`, lastModified: p.revisedAt ?? p.publishedAt })),
  ];
}
