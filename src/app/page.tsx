import { AppEfficiency } from "@/components/home/AppEfficiency";
import { EffectTiles, FlowTimeline, IncludedGrid, MethodChain, RecruitJourney, ServiceChain } from "@/components/home/Deck";
import { HomeStory } from "@/components/home/HomeStory";
import { ReturnCycle } from "@/components/home/Pillars";
import { BlogRows, WorksGrid } from "@/components/home/Sections";
import { StatementBand } from "@/components/home/StatementBand";
import { ContactCta, Heading, TextLink } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { getPosts, getWorks } from "@/lib/entries";
import { flow } from "@/lib/site";

export default async function Home() {
  const [works, posts] = await Promise.all([getWorks({ limit: 6 }), getPosts({ limit: 3 })]);

  return (
    <>
      <HomeStory />
      <StatementBand />
      <AppEfficiency />

      {/* 02 還元（夜色の上に、白い面がせり上がってくる） */}
      <section aria-labelledby="message-title" className="relative z-10 -mt-12 rounded-t-[40px] bg-paper py-28 md:-mt-16 md:rounded-t-[72px] md:py-40">
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Heading
              num="02"
              en="Message"
              id="message-title"
              title={
                <>
                  いい人材と、いい業務で、
                  <br />
                  関わった会社に還元する。
                </>
              }
              lead="サイトをつくって終わりにしない。ブランド、採用、業務まで整えて、はじめて成果になると考えています。"
            />
            <ul className="mt-10 flex flex-wrap gap-2">
              {["ブランドで選ばれる", "採用で人が集まる", "アプリで力を発揮する"].map((t) => (
                <li key={t} data-r="pop" className="inline-flex h-10 items-center gap-2 rounded-full bg-mist px-4 text-[13px] font-bold">
                  <Icon name="check" className="h-4 w-4 text-brand-deep" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
            <TextLink href="/company/" className="mt-10">
              しゅうみについて
            </TextLink>
          </div>
          <ReturnCycle />
        </div>
      </section>

      {/* 03 サービス */}
      <section aria-labelledby="service-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading num="03" en="Service" id="service-title" title="会社の成長に必要な3つを、まとめて。" lead="ブランディング、採用、業務効率化。どこからでも始められます。" />
          <div className="mt-24">
            <ServiceChain />
          </div>
        </div>
      </section>

      {/* 04 採用 */}
      <section aria-labelledby="recruit-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Heading num="04" en="Recruit" id="recruit-title" title="応募の前に、求職者は会社を調べる。" />
            <div data-r="up" className="lg:pb-2">
              <p className="text-[15px] leading-[2] text-ink-soft md:text-base">その「確かめる」場所が、採用サイト。働く人と仕事のリアルを届けて、納得して応募してもらいます。</p>
              <TextLink href="/website/recruit_website/" className="mt-6">
                採用サイト制作を見る
              </TextLink>
            </div>
          </div>
          <div className="mt-20">
            <RecruitJourney />
          </div>
        </div>
      </section>

      {/* 05 実績 */}
      <section aria-labelledby="works-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Heading num="05" en="Works" id="works-title" title="制作実績" lead="建設・建築業をはじめ、さまざまな業種で。" />
            <TextLink href="/works/" className="shrink-0">
              制作実績をすべて見る
            </TextLink>
          </div>
          <div className="mt-16">
            <WorksGrid works={works} />
          </div>
        </div>
      </section>

      {/* 06 効果 */}
      <section aria-labelledby="effect-title" className="bg-grad-deep py-28 text-paper md:py-40">
        <div className="wrap">
          <Heading num="06" en="Effect" id="effect-title" title="導入後に、変わること。" tone="inverse" />
          <div className="mt-16">
            <EffectTiles />
          </div>
        </div>
      </section>

      {/* 07 ものづくり */}
      <section aria-labelledby="about-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num="07" en="Method" id="about-title" title="作る前の準備を、いちばん大切に。" />
          <div className="mt-16">
            <MethodChain />
          </div>
        </div>
      </section>

      {/* 08 安心と含まれるもの */}
      <section aria-labelledby="assurance-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Heading num="08" en="Assurance" id="assurance-title" title="必要なものは、最初から全部入り。" />
            <TextLink href="/plan/" className="shrink-0">
              制作プランを見る
            </TextLink>
          </div>
          <div className="mt-16">
            <IncludedGrid />
          </div>
        </div>
      </section>

      {/* 09 流れ */}
      <section aria-labelledby="flow-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num="09" en="Flow" id="flow-title" title="ご相談から公開まで、5ステップ。" />
          <div className="mt-20">
            <FlowTimeline steps={flow} />
          </div>
        </div>
      </section>

      {/* ブログ */}
      <section aria-labelledby="blog-title" className="border-t border-line-soft bg-paper py-28 md:py-36">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
          <div>
            <Heading en="Blog" id="blog-title" title="ブログ" lead="ホームページと採用、業務改善のノウハウ。" />
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
