import { HomeStory } from "@/components/home/HomeStory";
import { Pillars, ReturnCycle } from "@/components/home/Pillars";
import { BlogRows, FlowSteps, Triad, WorksGrid } from "@/components/home/Sections";
import { ContactCta, Heading, TextLink } from "@/components/ui";
import { getColumns, getWorks } from "@/lib/microcms";
import { assurances, commonFeatures, effects, qualities, strengths } from "@/lib/site";

export default async function Home() {
  const [works, posts] = await Promise.all([getWorks({ limit: 6 }), getColumns({ limit: 3 })]);

  return (
    <>
      <HomeStory />

      {/* 還元のメッセージ */}
      <section aria-labelledby="message-title" className="bg-paper py-28 md:py-44">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <p className="label-en text-[13px] text-brand-deep">Message</p>
            <h2 id="message-title" className="mt-6 text-[1.75rem] leading-[1.75] tracking-[0.05em] md:text-[2.25rem]">
              いい人材と、いい業務で、
              <br />
              関わった会社に還元する。
            </h2>
            <div className="mt-10 space-y-6 text-[15px] leading-[2.2] text-ink-soft md:text-base">
              <p>
                ホームページは、つくって終わりではありません。ブランドが伝わり、いい人が集まり、その人たちが力を発揮できる。そこまで整って、はじめて会社の成果になると考えています。
              </p>
              <p>
                Shumi（しゅうみ）は「美しさがゆきとどく」という名前のとおり、外から見えるブランドも、内側の採用と業務も、ひとつのチームで整えます。
              </p>
            </div>
            <TextLink href="/company/" className="mt-10">
              しゅうみについて
            </TextLink>
          </div>
          <ReturnCycle />
        </div>
      </section>

      {/* 3つの柱 */}
      <section aria-labelledby="service-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading
            en="Service"
            id="service-title"
            title="サービス内容"
            lead="ブランディング、採用、業務効率化。会社の成長に必要な3つを、まとめてお任せいただけます。"
          />
          <div className="mt-20">
            <Pillars />
          </div>
        </div>
      </section>

      {/* 実績 */}
      <section aria-labelledby="works-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Heading en="Works" id="works-title" title="制作実績" lead="建設・建築業をはじめ、さまざまな業種のホームページを制作しています。" />
            <TextLink href="/works/" className="shrink-0">
              制作実績をすべて見る
            </TextLink>
          </div>
          <div className="mt-16">
            <WorksGrid works={works} />
          </div>
        </div>
      </section>

      {/* 効果 */}
      <section aria-labelledby="effect-title" className="bg-brand-dark py-28 text-paper md:py-40">
        <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <Heading en="Effect" id="effect-title" title="サイト制作・アプリ導入後の効果" tone="inverse" />
          <ul className="divide-y divide-paper/15 border-y border-paper/15">
            {effects.map((e) => (
              <li key={e.title} className="py-10">
                <p className="text-xl font-extrabold tracking-[0.04em]">{e.title}</p>
                <p className="mt-4 text-[15px] leading-[2.1] text-paper/70">{e.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ものづくり */}
      <section aria-labelledby="about-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="About" id="about-title" title="Shumiのものづくり" lead="サービスの魅力と企業のブランド力を最大限に引き出すために、作り始める前の準備を大切にしています。" />
          <div className="mt-20">
            <Triad items={strengths} />
          </div>
          <div className="mt-24 rounded-[28px] bg-mint p-8 md:p-14">
            <p className="text-[13px] font-bold tracking-[0.1em] text-brand-deep">すべての制作物に共通する3つの基準</p>
            <div className="mt-10">
              <Triad items={qualities} tone="panel" />
            </div>
          </div>
        </div>
      </section>

      {/* 安心のサービス */}
      <section aria-labelledby="assurance-title" className="border-t border-line-soft bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="Assurance" id="assurance-title" title="Shumiの安心のサービス" />
          <div className="mt-16">
            <Triad items={assurances} />
          </div>
          <div className="mt-20 grid gap-10 border-t border-line pt-12 lg:grid-cols-[16rem_1fr]">
            <p className="text-[15px] font-bold tracking-[0.06em]">すべてのプランに含まれる内容</p>
            <ul className="flex flex-wrap gap-3">
              {commonFeatures.map((f) => (
                <li key={f} className="rounded-full border border-line px-5 py-2.5 text-sm">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <TextLink href="/plan/" className="mt-10">
            制作プランを見る
          </TextLink>
        </div>
      </section>

      {/* 制作の流れ */}
      <section aria-labelledby="flow-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading en="Flow" id="flow-title" title="制作の流れ" />
          <div className="mt-16">
            <FlowSteps />
          </div>
        </div>
      </section>

      {/* ブログ */}
      <section aria-labelledby="blog-title" className="bg-paper py-28 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
          <div>
            <Heading en="Blog" id="blog-title" title="ブログ" lead="ホームページと採用、業務改善に役立つノウハウをお届けします。" />
            <TextLink href="/blog/" className="mt-8">
              ブログをすべて見る
            </TextLink>
          </div>
          <BlogRows posts={posts} />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
