import Image from "next/image";
import { WorkThumb } from "@/components/home/Sections";
import { Breadcrumb, Button, ContactCta } from "@/components/ui";
import { workCategoryLabel, type Work } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { mdxComponents } from "./mdx-components";

/** 制作実績の詳細ページ（content/works/{スラッグ}.mdx） */
export async function WorkArticle({ work: w }: { work: Work }) {
  const sections = [
    { title: "ご相談の内容", en: "Request", body: w.challenge },
    { title: "行ったこと", en: "Solution", body: w.solution },
    { title: "公開後の変化", en: "Result", body: w.result },
  ].filter((s) => s.body);
  const body = w.source.trim() ? await renderMdx(w.source, mdxComponents, `content/works/${w.id}.mdx`) : null;

  return (
    <>
      <article>
        <header className="bg-paper">
          <div className="hero-in wrap pb-16 pt-10 md:pb-20 md:pt-14">
            <Breadcrumb crumbs={[{ href: "/works/", label: "HP制作実績" }, { label: w.client }]} />
            <div className="mt-16 flex flex-wrap gap-x-4 gap-y-1 text-sm md:mt-20">
              {w.category.map((c) => (
                <span key={c} className="font-bold text-brand-deep">
                  {workCategoryLabel[c]}
                </span>
              ))}
              <span className="text-ink-mute">{w.industry}</span>
            </div>
            <h1 className="mt-4 text-[1.75rem] leading-[1.6] tracking-[0.05em] md:text-[2.5rem]">{w.client}</h1>
            <p className="mt-2 text-lg text-ink-soft">{w.title}</p>
            <p className="mt-8 max-w-2xl text-[15px] leading-[2.1] text-ink-soft md:text-base">{w.summary}</p>
          </div>
        </header>
        <div className="wrap">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-mint">
            <WorkThumb work={w} sizes="(min-width: 1280px) 1152px, 100vw" priority />
          </div>
        </div>

        {sections.length > 0 && (
          <ol className={`wrap mt-20 grid gap-4 ${sections.length === 3 ? "md:grid-cols-3" : sections.length === 2 ? "md:grid-cols-2" : ""}`}>
            {sections.map((s, i) => (
              <li key={s.title} data-r="pop" className={`rounded-[24px] p-7 ${i === sections.length - 1 && w.result ? "bg-grad-deep text-paper" : "bg-mist"}`}>
                <p className={`label-en text-[12px] ${i === sections.length - 1 && w.result ? "text-brand-light" : "text-brand-deep"}`}>
                  {String(i + 1).padStart(2, "0")} · {s.en}
                </p>
                <p className="mt-2 text-lg font-black">{s.title}</p>
                <p className={`mt-3 whitespace-pre-line text-[14.5px] leading-[2] ${i === sections.length - 1 && w.result ? "text-paper/80" : "text-ink-soft"}`}>{s.body}</p>
              </li>
            ))}
          </ol>
        )}

        {w.gallery && w.gallery.length > 0 && (
          <section aria-label="制作したサイトの画像" className="wrap mt-24">
            <p className="label-en text-[13px] text-brand-deep">Gallery</p>
            <ul className={`mt-6 grid gap-6 ${w.gallery.length > 1 ? "md:grid-cols-2" : ""}`}>
              {w.gallery.map((g, i) => {
                const tall = g.height / g.width > 1.3;
                return (
                  <li key={g.url} data-r="pop" className={!tall && w.gallery!.length > 1 && i === 0 ? "md:col-span-2" : ""}>
                    {tall ? (
                      // 縦に長いページ全体の画像は、枠の中でゆっくりスクロールして見せる
                      <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-mist ring-1 ring-line-soft [container-type:size]">
                        <Image
                          src={g.url}
                          alt={`${w.client}のサイト（ページ全体）`}
                          width={g.width}
                          height={g.height}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[6000ms] ease-in-out group-hover:translate-y-[calc(-100%+100cqh)]"
                        />
                        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-night/80 px-3 py-1.5 text-[12px] font-bold text-paper transition-opacity group-hover:opacity-0">
                          カーソルを乗せるとスクロール
                        </span>
                      </div>
                    ) : (
                      <div className="overflow-hidden rounded-[24px] bg-mist ring-1 ring-line-soft">
                        <Image src={g.url} alt={`${w.client}のサイト`} width={g.width} height={g.height} sizes="(min-width: 1280px) 1152px, 100vw" className="h-auto w-full" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {body && <div className="prose-shumi wrap mt-20 !max-w-[48rem]">{body.content}</div>}

        <div className="wrap mt-20 flex flex-col gap-3 pb-28 sm:flex-row md:pb-36">
          {w.url && (
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center justify-center rounded-full bg-grad-brand px-10 text-[15px] font-bold text-paper hover:brightness-110"
            >
              公開中のサイトを見る（新しいタブ）
            </a>
          )}
          <Button href="/works/" variant="secondary">
            制作実績の一覧へ
          </Button>
        </div>
      </article>
      <ContactCta />
    </>
  );
}
