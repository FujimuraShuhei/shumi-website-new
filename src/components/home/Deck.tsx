import Link from "next/link";
import { Arrow, Button } from "@/components/ui";
import { Icon, IconBadge, type IconName } from "@/components/ui/icons";

/* ==================================================================
   トップページの「資料デザイン」の図解たち
   文章は短い一言にし、図とアイコンで伝える。
   data-r="pop" で、近くの要素がポンポンと順に現れる。
================================================================== */

/** 03 サービス：ブランド → 採用 → 業務 → 成長 のつながり */
export function ServiceChain() {
  const items: {
    en: string;
    icon: IconName;
    name: string;
    catch: string;
    tags: { href: string; label: string }[];
    href: string;
    featured?: boolean;
  }[] = [
    {
      en: "Branding",
      icon: "brand",
      name: "ブランディング・サイト制作",
      catch: "選ばれる会社に。",
      tags: [
        { href: "/website/corpolate/", label: "コーポレートサイト" },
        { href: "/construction_industry_website/", label: "建設・建築業特化" },
        { href: "/website/service_site/", label: "集客サイト" },
      ],
      href: "/website/",
    },
    {
      en: "Recruit",
      icon: "people",
      name: "採用サイト制作",
      catch: "いい人が集まる。",
      tags: [
        { href: "/website/recruit_website/", label: "採用サイト" },
        { href: "/website/recruit_website/", label: "社員インタビュー" },
        { href: "/website/recruit_website/", label: "面談予約" },
      ],
      href: "/website/recruit_website/",
      featured: true,
    },
    {
      en: "Business app",
      icon: "app",
      name: "業務効率化アプリ開発",
      catch: "力を発揮できる。",
      tags: [
        { href: "/app/", label: "日報・案件管理" },
        { href: "/app/", label: "写真台帳" },
        { href: "/app/#sales-tool", label: "営業ツール" },
      ],
      href: "/app/",
    },
  ];

  return (
    <div>
      <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* つなぐ矢印（PC） */}
        <svg aria-hidden="true" className="pointer-events-none absolute -top-10 left-0 hidden h-10 w-full lg:block" viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path data-r-draw d="M166 30 C 250 0, 416 0, 500 30" fill="none" stroke="#3cc3c4" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
          <path data-r-draw d="M500 30 C 584 0, 750 0, 834 30" fill="none" stroke="#3cc3c4" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
        </svg>
        {items.map((it, i) => (
          <li
            key={it.en}
            data-r="pop"
            className={`relative flex flex-col rounded-[28px] p-8 md:p-9 ${
              it.featured ? "bg-grad-deep text-paper shadow-[0_40px_80px_-40px_rgba(13,31,34,0.6)] lg:-translate-y-4" : "bg-card ring-1 ring-line-soft"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <IconBadge name={it.icon} tone={it.featured ? "brand" : "light"} size="lg" />
              <span className={`display-en text-[3rem] leading-none ${it.featured ? "text-paper/15" : "text-ink/[0.07]"}`}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            {it.featured && (
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-night">
                <Icon name="up" className="h-3.5 w-3.5" strokeWidth={2.2} />
                特に効果を実感いただいています
              </span>
            )}
            <p className={`label-en mt-6 text-[13px] ${it.featured ? "text-brand-light" : "text-brand-deep"}`}>{it.en}</p>
            <h3 className={`mt-1 text-[13px] font-bold tracking-[0.06em] ${it.featured ? "text-paper/70" : "text-ink-mute"}`}>{it.name}</h3>
            <p className="mt-3 text-[1.75rem] font-black leading-[1.4] tracking-[0.02em]">{it.catch}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {it.tags.map((t) => (
                <li key={t.label}>
                  <Link
                    href={t.href}
                    className={`inline-flex h-9 items-center rounded-full px-3.5 text-[12px] font-bold transition-colors ${
                      it.featured ? "bg-paper/10 text-paper hover:bg-paper/20" : "bg-mist text-ink-soft hover:bg-brand-wash hover:text-brand-deep"
                    }`}
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Button href={it.href} variant={it.featured ? "light" : "secondary"} className="!h-14 w-full !pl-6 [&>span]:!h-10 [&>span]:!w-10">
                詳しく見る
              </Button>
            </div>
          </li>
        ))}
      </ol>
      {/* ゴール */}
      <div data-r="pop" className="mx-auto mt-10 flex w-fit items-center gap-4 rounded-full bg-card px-6 py-3 ring-1 ring-line-soft">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-grad-brand text-paper">
          <Icon name="up" className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="text-[15px] font-black tracking-[0.04em]">関わった会社の成長に、還元する</span>
      </div>
    </div>
  );
}

/** 04 採用：求職者が応募するまでの流れと、採用サイトの役割 */
export function RecruitJourney() {
  const steps: { icon: IconName; title: string; sub: string; key?: boolean }[] = [
    { icon: "search", title: "求人を見つける", sub: "求人媒体・SNS" },
    { icon: "globe", title: "会社名で調べる", sub: "検索する" },
    { icon: "people", title: "採用サイトで確かめる", sub: "人・仕事・待遇", key: true },
    { icon: "mail", title: "応募・面談", sub: "その場で予約" },
    { icon: "handshake", title: "入社・定着", sub: "納得して入社" },
  ];
  const compare = {
    before: ["載せられる情報が限られる", "他社と横並びで比べられる", "入社後のギャップが起きやすい"],
    after: ["働く人の顔と声が見える", "自社の魅力を自由に伝えられる", "納得して応募してもらえる"],
  };

  return (
    <div>
      {/* 流れ */}
      <div className="relative">
        <svg aria-hidden="true" className="absolute left-0 right-0 top-[34px] hidden h-1 w-full md:block" viewBox="0 0 1000 4" preserveAspectRatio="none">
          <path data-r-draw d="M100 2 H900" stroke="#c9e6e8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} data-r="pop" className={`flex flex-col items-center text-center ${s.key ? "col-span-2 md:col-span-1" : ""}`}>
              <span
                className={`relative grid h-[68px] w-[68px] place-items-center rounded-full ${
                  s.key ? "bg-grad-brand text-paper shadow-[0_0_0_10px_rgba(60,195,196,0.18)]" : "bg-card text-brand-deep ring-1 ring-line"
                }`}
              >
                <Icon name={s.icon} className="h-7 w-7" />
                <span className={`label-en absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full text-[11px] ${s.key ? "bg-night text-paper" : "bg-mist text-ink-soft"}`}>
                  {i + 1}
                </span>
              </span>
              <p className={`mt-4 text-[15px] font-black tracking-[0.03em] ${s.key ? "text-brand-deep" : ""}`}>{s.title}</p>
              <p className="mt-1 text-[12px] text-ink-mute">{s.sub}</p>
              {s.key && (
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-night px-3 py-1 text-[11px] font-bold text-paper">
                  Shumiがつくる場所
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* 比べる */}
      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div data-r="pop" className="rounded-[24px] bg-card p-7 ring-1 ring-line-soft">
          <p className="text-[13px] font-bold text-ink-mute">求人媒体だけ</p>
          <ul className="mt-4 space-y-3">
            {compare.before.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-ink-soft">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist text-ink-mute">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-r="pop" aria-hidden="true" className="mx-auto grid h-12 w-12 rotate-90 place-items-center rounded-full bg-grad-brand text-paper md:rotate-0">
          <Arrow />
        </div>
        <div data-r="pop" className="rounded-[24px] bg-grad-deep p-7 text-paper">
          <p className="text-[13px] font-bold text-brand-light">採用サイトがあると</p>
          <ul className="mt-4 space-y-3">
            {compare.after.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] font-bold">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-light text-night">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** 06 効果：キーワードで見せるタイル */
export function EffectTiles() {
  const tiles: { icon: IconName; key: string; en: string; body: string }[] = [
    { icon: "shield", key: "信頼", en: "Trust", body: "会社のブランドと信頼が上がる" },
    { icon: "people", key: "採用", en: "Recruit", body: "応募が増え、ミスマッチが減る" },
    { icon: "search", key: "集客", en: "Leads", body: "検索から問い合わせが届く" },
    { icon: "clock", key: "生産性", en: "Productivity", body: "社員が本来の仕事に集中できる" },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {tiles.map((t) => (
        <li key={t.key} data-r="pop" className="relative overflow-hidden rounded-[24px] bg-paper/[0.06] p-5 ring-1 ring-paper/12 md:p-7">
          <div className="flex items-center justify-between">
            <IconBadge name={t.icon} tone="dark" />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light/15 text-brand-light">
              <Icon name="up" className="h-5 w-5" strokeWidth={2} />
            </span>
          </div>
          <p className="label-en mt-8 text-[12px] text-brand-light">{t.en}</p>
          <p className="mt-1 text-[1.75rem] font-black leading-none tracking-[0.02em] md:text-[2.25rem]">{t.key}</p>
          <p className="mt-4 text-[12.5px] leading-[1.8] text-paper/75 md:text-[14px]">{t.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** 07 進め方：3つの準備をチェーンで、3つの基準をバッジで */
export function MethodChain() {
  const steps: { icon: IconName; en: string; title: string; body: string }[] = [
    { icon: "chat", en: "Hearing", title: "徹底したヒアリング", body: "事業と課題を深く伺う" },
    { icon: "search", en: "Research", title: "競合との差別化調査", body: "選ばれる強みを言葉に" },
    { icon: "pen", en: "Writing", title: "テキストもお任せ", body: "伝わる文章まで作成" },
  ];
  const badges: { icon: IconName; en: string; title: string }[] = [
    { icon: "shield", en: "Secure", title: "セキュリティに強い" },
    { icon: "eye", en: "Readable", title: "見やすい" },
    { icon: "tap", en: "Usable", title: "触りやすい" },
  ];
  return (
    <div>
      <ol className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((s, i) => (
          <li key={s.en} className="contents">
            <div data-r="pop" className="rounded-[24px] bg-card p-7 ring-1 ring-line-soft">
              <div className="flex items-center gap-4">
                <IconBadge name={s.icon} />
                <div>
                  <p className="label-en text-[12px] text-brand-deep">Step {String(i + 1).padStart(2, "0")}</p>
                  <p className="label-en text-[1.25rem] leading-tight">{s.en}</p>
                </div>
              </div>
              <p className="mt-6 text-lg font-black tracking-[0.03em]">{s.title}</p>
              <p className="mt-1 text-[14px] text-ink-soft">{s.body}</p>
            </div>
            {i < steps.length - 1 && (
              <span data-r="pop" aria-hidden="true" className="mx-auto grid h-10 w-10 rotate-90 place-items-center self-center rounded-full bg-brand-wash text-brand-deep md:rotate-0">
                <Arrow />
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-[28px] bg-grad-mint p-6 md:p-8">
        <p className="text-center text-[13px] font-bold tracking-[0.08em] text-brand-deep">すべての制作物に共通する3つの基準</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {badges.map((b) => (
            <li key={b.en} data-r="pop" className="flex items-center gap-4 rounded-2xl bg-card px-5 py-4 shadow-[0_10px_30px_-20px_rgba(13,31,34,0.4)]">
              <IconBadge name={b.icon} tone="brand" size="sm" />
              <div>
                <p className="label-en text-[11px] text-brand-deep">{b.en}</p>
                <p className="text-[15px] font-black">{b.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** 08 含まれるもの：アイコンの一覧表 */
export function IncludedGrid() {
  const features: { icon: IconName; label: string }[] = [
    { icon: "mobile", label: "スマホ対応" },
    { icon: "mail", label: "メールフォーム" },
    { icon: "lock", label: "SSL化" },
    { icon: "globe", label: "独自ドメイン" },
    { icon: "image", label: "画像用意（10枚）" },
    { icon: "camera", label: "画像加工" },
    { icon: "layout", label: "更新できる管理画面" },
    { icon: "blog", label: "ブログ機能" },
  ];
  const assurances: { icon: IconName; title: string; body: string }[] = [
    { icon: "brand", title: "完全オリジナルデザイン", body: "テンプレートではなく一社ごとに" },
    { icon: "blog", title: "ブログ・お知らせ機能", body: "追加料金なしで標準装備" },
    { icon: "support", title: "安心のアフターサポート", body: "電話・メール・オンラインで" },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
      <ul className="grid gap-4">
        {assurances.map((a) => (
          <li key={a.title} data-r="pop" className="flex items-center gap-5 rounded-[24px] bg-grad-deep p-6 text-paper">
            <IconBadge name={a.icon} tone="dark" size="lg" />
            <div>
              <p className="text-lg font-black tracking-[0.03em]">{a.title}</p>
              <p className="mt-1 text-[14px] text-paper/70">{a.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="rounded-[28px] bg-card p-6 ring-1 ring-line-soft md:p-8">
        <p className="text-[13px] font-bold tracking-[0.08em] text-ink-mute">すべてのプランに含まれる内容</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {features.map((f) => (
            <li key={f.label} data-r="pop" className="flex flex-col items-center gap-3 rounded-2xl bg-mist px-3 py-5 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-brand-deep shadow-[0_6px_16px_-10px_rgba(13,31,34,0.5)]">
                <Icon name={f.icon} />
              </span>
              <span className="text-[13px] font-bold leading-snug">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** 09 制作の流れ：タイムライン */
export function FlowTimeline({ steps }: { steps: { title: string; body: string; short?: string }[] }) {
  const icons: IconName[] = ["chat", "layout", "pen", "check", "up"];
  return (
    <div className="relative">
      <svg aria-hidden="true" className="absolute left-0 right-0 top-[31px] hidden h-1 w-full md:block" viewBox="0 0 1000 4" preserveAspectRatio="none">
        <path data-r-draw d="M100 2 H900" stroke="url(#flow-grad)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <defs>
          <linearGradient id="flow-grad" gradientUnits="userSpaceOnUse" x1="100" x2="900" y1="0" y2="0">
            <stop offset="0" stopColor="#3cc3c4" />
            <stop offset="1" stopColor="#0b7596" />
          </linearGradient>
        </defs>
      </svg>
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
        {steps.map((s, i) => (
          <li key={s.title} data-r="pop" className="flex items-start gap-5 md:flex-col md:items-center md:text-center">
            <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-card text-brand-deep shadow-[0_12px_30px_-16px_rgba(13,31,34,0.5)] ring-1 ring-line-soft">
              <Icon name={icons[i] ?? "check"} className="h-7 w-7" />
              <span className="label-en absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-grad-brand text-[11px] text-paper">{i + 1}</span>
            </span>
            <div className="md:mt-5">
              <p className="text-[17px] font-black tracking-[0.03em]">{s.title}</p>
              <p className="mt-1.5 text-[13px] font-bold leading-[1.8] text-ink-soft">{s.short ?? s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
