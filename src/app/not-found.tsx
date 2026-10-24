import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap py-32 md:py-48">
        <p className="display-en text-grad-brand text-[6rem] md:text-[10rem]">404</p>
        <h1 className="mt-8 text-2xl tracking-[0.05em] md:text-3xl">お探しのページが見つかりません</h1>
        <p className="mt-6 max-w-xl text-[15px] leading-[2.1] text-ink-soft">
          ページが移動または削除された可能性があります。ホームやメニューからお探しください。
        </p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/">ホームへ戻る</Button>
          <Button href="/contact/" variant="secondary">
            お問い合わせ
          </Button>
        </div>
      </div>
    </section>
  );
}
