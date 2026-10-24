import Link from "next/link";
import { appServices, site, websiteServices } from "@/lib/site";
import { Logo } from "./Logo";

const groups = [
  { title: "サイト制作内容", links: [{ href: "/website/", label: "サイト制作内容" }, ...websiteServices] },
  { title: "業務アプリ開発", links: appServices },
  {
    title: "Shumiについて",
    links: [
      { href: "/plan/", label: "制作プラン" },
      { href: "/works/", label: "HP制作実績" },
      { href: "/design_all/", label: "デザイン制作" },
      { href: "/company/", label: "しゅうみについて" },
      { href: "/blog/", label: "ブログ" },
    ],
  },
  {
    title: "ご相談",
    links: [
      { href: "/document/", label: "お役立ち資料" },
      { href: "/contact/", label: "お問い合わせ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="wrap grid gap-16 pb-14 pt-24 lg:grid-cols-[1fr_2.4fr]">
        <div>
          <Link href="/" className="inline-block rounded text-paper" aria-label="Shumi ホーム">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="mt-6 text-sm text-paper/70">{site.tagline}</p>
          <dl className="mt-8 space-y-2 text-sm text-paper/70">
            <div className="flex gap-4">
              <dt className="w-16 shrink-0">所在地</dt>
              <dd>{site.company.address}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0">営業時間</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="text-[13px] font-bold tracking-[0.08em] text-brand-light">{g.title}</p>
              <ul className="mt-5 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-[13px] text-paper/80 transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="flex flex-col gap-4 border-t border-paper/10 py-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy/" className="hover:text-paper">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/regalpage/" className="hover:text-paper">
                利用規約
              </Link>
            </li>
          </ul>
          <p className="en">© 2022–{new Date().getFullYear()} Shumi</p>
        </div>
      </div>
    </footer>
  );
}
