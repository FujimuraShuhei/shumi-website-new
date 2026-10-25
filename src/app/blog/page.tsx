import type { Metadata } from "next";
import { BlogList } from "@/components/post/BlogList";
import { ContactCta, PageHero } from "@/components/ui";
import { getPosts } from "@/lib/entries";

export const metadata: Metadata = {
  title: "ブログ",
  description: "ホームページ制作・Web集客・建設業の集客・業務改善に役立つノウハウをお届けします。",
};

export default async function BlogPage() {
  // 一覧に本文は不要なので外して渡す
  const posts = (await getPosts()).map((p) => ({ ...p, source: "" }));
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <>
      <PageHero crumbs={[{ label: "ブログ" }]} en="Blog" title="ブログ" lead="ホームページと業務改善に役立つノウハウをお届けします。" />
      <section aria-label="記事の一覧" className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <BlogList posts={posts} categories={categories} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
