"use client";

import { AppMock } from "./AppMock";
import { BrandSiteMock } from "./BrandSiteMock";
import { MockScaler, useInView } from "./kit";
import { RecruitMock } from "./RecruitMock";

/** 下層ページで、そのサービスのモックを夜色の背景で見せる帯 */
export function MockShowcase({ kind, caption }: { kind: "brand" | "recruit" | "app"; caption: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section aria-label={caption} className="relative overflow-x-clip bg-night py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] top-0 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(6,159,169,0.25),transparent)]" />
      <div ref={ref} className="wrap relative">
        <div className="mx-auto max-w-[960px]">
          <MockScaler>
            {kind === "brand" ? <BrandSiteMock active={inView} /> : kind === "recruit" ? <RecruitMock active={inView} /> : <AppMock active={inView} />}
          </MockScaler>
          <p className="mt-8 text-center text-[13px] tracking-[0.08em] text-paper/60">{caption}</p>
        </div>
      </div>
    </section>
  );
}
