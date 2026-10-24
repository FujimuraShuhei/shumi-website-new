import Link from "next/link";
import { FlowTimeline, IncludedGrid } from "@/components/home/Deck";
import { WorksGrid } from "@/components/home/Sections";
import { MockShowcase } from "@/components/mocks/MockShowcase";
import { Button, ContactCta, Heading, PageHero, TextLink } from "@/components/ui";
import { getWorks } from "@/lib/microcms";
import type { ServicePage } from "@/lib/service-pages";
import { CaseTiles, IdeaTiles, PointCards, StepChips } from "@/components/ui/deck";
import { Icon } from "@/components/ui/icons";
import { flow } from "@/lib/site";

export async function ServiceDetail({ page }: { page: ServicePage }) {
  const works = (await getWorks()).filter((w) => !page.worksIndustry || w.industry.includes(page.worksIndustry)).slice(0, 3);
  // 見出しの番号（表示されるセクションだけ順に振る）
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <PageHero
        crumbs={[{ href: "/website/", label: "サイト制作内容" }, { label: page.name }]}
        en={page.en}
        title={page.title}
        lead={page.lead}
      >
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact/">無料で相談する</Button>
          <Button href="/document/" variant="secondary">
            資料をダウンロードする
          </Button>
        </div>
      </PageHero>

      {page.mock && <MockShowcase kind={page.mock.kind} caption={page.mock.caption} />}

      {page.intro && (
        <section aria-labelledby="intro-title" className="bg-paper py-28 md:py-40">
          <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Heading num={next()} en="Why" id="intro-title" title={page.intro.title} />
            <ol className="relative grid gap-4">
              <span aria-hidden="true" className="absolute bottom-10 left-[39px] top-10 w-px bg-line" />
              {page.intro.body.map((b, i) => (
                <li key={b} data-r="pop" className="relative flex items-start gap-5 rounded-[24px] bg-mist p-6">
                  <span className={`label-en grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] ${i === page.intro!.body.length - 1 ? "bg-grad-brand text-paper" : "bg-paper text-brand-deep ring-1 ring-line"}`}>
                    {i === page.intro!.body.length - 1 ? <Icon name="check" className="h-4 w-4" strokeWidth={2.4} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-bold leading-[1.95]">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="points-title" className={`${page.intro ? "bg-mist" : "bg-paper"} py-28 md:py-40`}>
        <div className="wrap">
          <Heading num={next()} en="Strength" id="points-title" title={page.pointsTitle} />
          <div className="mt-16">
            <PointCards items={page.points} tone={page.intro ? "panel" : "light"} />
          </div>
        </div>
      </section>

      {page.cases && (
        <section aria-labelledby="cases-title" className={`${page.intro ? "bg-paper" : "bg-mist"} py-28 md:py-40`}>
          <div className="wrap">
            <Heading num={next()} en="Case" id="cases-title" title={page.casesTitle} />
            <div className="mt-16">
              <CaseTiles items={page.cases} />
            </div>
          </div>
        </section>
      )}

      {page.extra && (
        <section aria-labelledby="extra-title" className="bg-grad-deep py-28 text-paper md:py-40">
          <div className="wrap grid gap-16">
            <Heading num={next()} en="Design" id="extra-title" title={page.extra.title} tone="inverse" />
            <PointCards items={page.extra.items} tone="dark" />
          </div>
        </section>
      )}

      <section aria-labelledby="flow-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading num={next()} en="Flow" id="flow-title" title={page.flow ? `公開まで、${page.flow.length}ステップ。` : "ご相談から公開まで、5ステップ。"} />
          <div className="mt-16">{page.flow ? <StepChips steps={page.flow} /> : <FlowTimeline steps={flow} />}
          </div>
        </div>
      </section>

      <section aria-labelledby="assure-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading num={next()} en="Assurance" id="assure-title" title="必要なものは、最初から全部入り。" />
          <div className="mt-16">
            <IncludedGrid />
          </div>
        </div>
      </section>

      {page.appIdeas && (
        <section aria-labelledby="app-title" className="bg-grad-night py-24 text-paper md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-24">
            <div>
              <p className="label-en text-[13px] text-brand-light">Business app</p>
              <h2 id="app-title" className="mt-5 text-2xl leading-[1.7] tracking-[0.05em] md:text-[1.75rem]">
                サイトと一緒に、
                <br />
                社内の業務もアプリで軽く。
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[2.1] text-paper/70">建設業の現場と事務所をつなぐ、業務効率化アプリも開発しています。</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/app/" variant="light">
                  業務アプリ開発を見る
                </Button>
                <Button href="/app/demo/" variant="ghost">
                  デモを触る
                </Button>
              </div>
            </div>
            <IdeaTiles items={page.appIdeas} tone="dark" />
          </div>
        </section>
      )}

      {works.length > 0 && (
        <section aria-labelledby="works-title" className="bg-paper py-28 md:py-40">
          <div className="wrap">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <Heading num={next()} en="Works" id="works-title" title="制作実績" />
              <TextLink href="/works/">制作実績をすべて見る</TextLink>
            </div>
            <div className="mt-16">
              <WorksGrid works={works} />
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  );
}
