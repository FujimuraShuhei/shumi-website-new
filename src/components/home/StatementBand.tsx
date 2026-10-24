import { Marquee } from "@/components/motion/Marquee";

const en = ["Branding", "Recruit site", "Business app", "Sales tool", "Yokohama"];
const ja = ["ブランディング", "採用サイト", "業務効率化アプリ", "営業ツール", "ホームページ制作"];

function Dot() {
  return <span aria-hidden="true" className="mx-[0.45em] inline-block h-[0.18em] w-[0.18em] translate-y-[-0.28em] rounded-full bg-brand-light" />;
}

/**
 * ファーストビュー（夜色）の下に続く、流れる文字の帯。
 * 2段が逆向きに流れ、スクロールの速さで加速する。
 */
export function StatementBand() {
  return (
    <section data-header-dark aria-label="Shumiの提供サービス" className="relative overflow-hidden bg-[#0c2026] pb-6 pt-4 md:pb-10">
      <Marquee speed={38} className="py-2">
        {en.map((w) => (
          <span key={w} className="display-en flex items-center !pb-0 text-[clamp(3.5rem,9vw,8.5rem)] leading-[1.05] text-transparent [-webkit-text-stroke:1.5px_rgba(60,195,196,0.55)]">
            {w}
            <Dot />
          </span>
        ))}
      </Marquee>
      <Marquee speed={46} direction={-1} className="py-2">
        {ja.map((w) => (
          <span key={w} className="flex items-center text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[1.3] tracking-[0.04em] text-paper/90">
            {w}
            <Dot />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
