import Link from "next/link";
import { Arrow } from "@/components/ui";

const pillars = [
  {
    en: "Branding",
    title: "ブランディング・ホームページ制作",
    catch: "会社の強みを、選ばれる理由に。",
    body: "ヒアリングと競合調査で強みを言葉にし、取引先やお客様に信頼される会社の顔をつくります。",
    links: [
      { href: "/website/corpolate/", label: "コーポレートサイト" },
      { href: "/construction_industry_website/", label: "建設・建築業特化サイト" },
      { href: "/website/service_site/", label: "集客ができるサイト" },
    ],
    featured: false,
  },
  {
    en: "Recruit",
    title: "採用サイト制作",
    catch: "いい人が、自然と集まる会社に。",
    body: "求人媒体に頼り切らず、自社の魅力で人を集める。働く人の声と仕事のリアルを伝え、応募の数と質を変え、採用コストとミスマッチを減らします。",
    links: [{ href: "/website/recruit_website/", label: "採用応募を増やすサイト制作" }],
    featured: true,
  },
  {
    en: "Business app",
    title: "業務効率化アプリ開発",
    catch: "集まった人の力を、仕事に。",
    body: "日報、案件管理、写真台帳、営業の顧客管理。紙やExcelの手間をなくし、社員が本来の仕事に力を注げる環境をつくります。",
    links: [
      { href: "/app/", label: "業務効率化アプリ・営業ツール" },
      { href: "/app/demo/", label: "アプリのデモを触る" },
    ],
    featured: false,
  },
];

export function Pillars() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {pillars.map((p) => (
        <li
          key={p.en}
          className={`relative flex flex-col overflow-hidden rounded-[28px] p-8 md:p-10 ${
            p.featured ? "bg-brand-dark text-paper lg:-my-6 lg:py-16" : "bg-paper ring-1 ring-line-soft"
          }`}
        >
          {p.featured && (
            <span className="absolute right-6 top-6 rounded-full bg-brand-light px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-night md:right-8 md:top-8">
              特に効果を実感いただいています
            </span>
          )}
          <p className={`en text-sm ${p.featured ? "text-brand-light" : "text-brand-deep"}`}>{p.en}</p>
          <h3 className="mt-4 text-[13px] font-medium tracking-[0.1em] opacity-70">{p.title}</h3>
          <p className="phrase mt-3 text-[1.25rem] font-medium leading-[1.65] tracking-[0.06em] xl:text-[1.375rem]">{p.catch}</p>
          <p className={`mt-5 text-[15px] leading-[2.05] ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>{p.body}</p>
          <ul className={`mt-auto divide-y pt-10 ${p.featured ? "divide-paper/15" : "divide-line-soft"}`}>
            {p.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex min-h-14 items-center justify-between gap-4 text-[15px] font-medium">
                  {l.label}
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      p.featured ? "bg-paper/10 group-hover:bg-paper group-hover:text-ink" : "bg-mist group-hover:bg-brand-deep group-hover:text-paper"
                    }`}
                  >
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/** ブランド → 採用 → 業務 → 会社への還元、の循環図 */
export function ReturnCycle() {
  const nodes = [
    { x: 200, y: 48, t: "ブランドで", s: "選ばれる" },
    { x: 352, y: 200, t: "採用で", s: "いい人が集まる" },
    { x: 200, y: 352, t: "業務アプリで", s: "力を発揮する" },
    { x: 48, y: 200, t: "会社に", s: "成果が還元される" },
  ];
  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 400 400" className="w-full" role="img" aria-labelledby="cycle-title">
        <title id="cycle-title">ブランドで選ばれ、採用でいい人が集まり、業務アプリで力を発揮し、会社に成果が還元される循環</title>
        <defs>
          <linearGradient id="cycle-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3cc3c4" />
            <stop offset="1" stopColor="#0a7a83" />
          </linearGradient>
          <marker id="cycle-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10z" fill="#0a7a83" />
          </marker>
        </defs>
        <circle cx="200" cy="200" r="152" fill="none" stroke="#e2f3f4" strokeWidth="18" />
        {[
          "M262 62 A152 152 0 0 1 338 138",
          "M338 262 A152 152 0 0 1 262 338",
          "M138 338 A152 152 0 0 1 62 262",
          "M62 138 A152 152 0 0 1 138 62",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke="url(#cycle-g)" strokeWidth="2" markerEnd="url(#cycle-arrow)" />
        ))}
        <circle cx="200" cy="200" r="74" fill="#154245" />
        <text x="200" y="192" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="500" letterSpacing="2">
          関わった会社の
        </text>
        <text x="200" y="216" textAnchor="middle" fill="#3cc3c4" fontSize="16" fontWeight="600" letterSpacing="2">
          成長
        </text>
        {nodes.map((n) => (
          <g key={n.t}>
            <circle cx={n.x} cy={n.y} r="44" fill="#ffffff" stroke="#dbe3e7" />
            <text x={n.x} y={n.y - 4} textAnchor="middle" fill="#4a5764" fontSize="10.5" letterSpacing="1">
              {n.t}
            </text>
            <text x={n.x} y={n.y + 13} textAnchor="middle" fill="#1d2a36" fontSize={n.s.length > 6 ? 9.5 : 11.5} fontWeight="600" letterSpacing="0.5">
              {n.s}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
