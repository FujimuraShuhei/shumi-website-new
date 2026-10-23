import Link from "next/link";
import { FlowSteps, Triad, WorksGrid } from "@/components/home/Sections";
import { MockShowcase } from "@/components/mocks/MockShowcase";
import { Arrow, Button, ContactCta, Heading, PageHero } from "@/components/ui";
import { getWorks } from "@/lib/microcms";
import type { ServicePage } from "@/lib/service-pages";
import { assurances } from "@/lib/site";

export async function ServiceDetail({ page }: { page: ServicePage }) {
  const works = (await getWorks()).filter((w) => !page.worksIndustry || w.industry.includes(page.worksIndustry)).slice(0, 3);

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
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <h2 id="intro-title" className="text-[1.625rem] font-medium leading-[1.8] tracking-[0.1em] md:text-[2rem]">
              {page.intro.title}
            </h2>
            <div className="space-y-6 text-[15px] leading-[2.2] text-ink-soft md:text-base">
              {page.intro.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="points-title" className={`${page.intro ? "bg-mist" : "bg-paper"} py-28 md:py-40`}>
        <div className="wrap">
          <Heading en="Strength" id="points-title" title={page.pointsTitle} />
          <div className="mt-16">
            <Triad items={page.points} />
          </div>
        </div>
      </section>

      {page.cases && (
        <section aria-labelledby="cases-title" className={`${page.intro ? "bg-paper" : "bg-mist"} py-28 md:py-40`}>
          <div className="wrap">
            <Heading en="Case" id="cases-title" title={page.casesTitle} />
            <ul className={`mt-16 grid gap-px overflow-hidden rounded-2xl bg-line-soft md:grid-cols-2 ${page.cases.length > 4 ? "lg:grid-cols-3" : ""}`}>
              {page.cases.map((c) => (
                <li key={c.title} className="bg-paper p-8 md:p-10">
                  <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-brand" />
                  <p className="mt-6 text-lg font-semibold tracking-[0.06em]">{c.title}</p>
                  <p className="mt-3 text-[15px] leading-[2.05] text-ink-soft">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.extra && (
        <section aria-labelledby="extra-title" className="bg-brand-dark py-28 text-paper md:py-40">
          <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
            <Heading en="Design" id="extra-title" title={page.extra.title} tone="inverse" />
            <ul className="divide-y divide-paper/15 border-y border-paper/15">
              {page.extra.items.map((e) => (
                <li key={e.title} className="py-10">
                  <p className="text-xl font-medium tracking-[0.08em]">{e.title}</p>
                  <p className="mt-4 text-[15px] leading-[2.1] text-paper/70">{e.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="flow-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="Flow" id="flow-title" title="制作の流れ" />
          <div className="mt-16">
            {page.flow ? (
              <ol className="grid gap-px overflow-hidden rounded-2xl bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
                {page.flow.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-5 bg-paper px-8 py-7">
                    <span className="en text-sm font-medium text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold tracking-[0.06em]">{f}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <FlowSteps />
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="assure-title" className="bg-mist py-28 md:py-40">
        <div className="wrap">
          <Heading en="Assurance" id="assure-title" title="安心の3つのサービス付き" />
          <div className="mt-16">
            <Triad items={assurances} tone="panel" />
          </div>
        </div>
      </section>

      {page.appIdeas && (
        <section aria-labelledby="app-title" className="bg-night py-24 text-paper md:py-32">
          <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-24">
            <div>
              <p className="en text-sm text-brand-light">Business app</p>
              <h2 id="app-title" className="mt-5 text-2xl font-medium leading-[1.7] tracking-[0.08em] md:text-[1.75rem]">
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
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.appIdeas.map((a) => (
                <li key={a} className="rounded-2xl border border-paper/15 p-6 text-[15px] font-medium leading-relaxed tracking-[0.06em]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {works.length > 0 && (
        <section aria-labelledby="works-title" className="bg-paper py-28 md:py-40">
          <div className="wrap">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <Heading en="Works" id="works-title" title="制作実績" />
              <Link href="/works/" className="group inline-flex min-h-11 items-center gap-3 text-[15px] font-medium text-brand-deep">
                制作実績をすべて見る
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </Link>
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
