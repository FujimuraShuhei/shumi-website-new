@AGENTS.md

# Shumi 公式サイト — 作業ガイド

横浜市の Web 制作「Shumi（しゅうみ）」の公式サイト（Next.js App Router・Vercel）。
**CMS は使わない。** ブログ記事と制作実績は `content/` の MDX ファイルとしてコードで書き、PR → main にマージすると Vercel が自動で公開する。

---

## 記事・制作実績の書き方

### 運用の流れ

1. ブランチを切る（例：`post/recruit-site-cost`）
2. `npm run new:post -- スラッグ`（制作実績は `npm run new:work -- スラッグ`）でテンプレートからファイルを作る
3. 本文を書き、画像を `npm run images -- 元画像 public/blog/スラッグ` で変換して置く
4. `npm run build` が通ることを確認（フロントマターの誤り・画像の置き忘れはここでエラーになる）
5. `npm run dev` で `http://localhost:3000/スラッグ/` を開き、PC幅とスマホ幅（390px）で見た目を確認
6. PR を作る → Vercel のプレビューURLで最終確認 → main にマージで公開

`draft: true` の間は本番に出ない（開発中だけ表示）。公開するときに消す。

### ファイルの置き場所

| もの | 場所 | URL |
|---|---|---|
| ブログ記事 | `content/blog/スラッグ.mdx` | `/スラッグ/` |
| 制作実績 | `content/works/スラッグ.mdx` | `/スラッグ/` |
| 記事の画像 | `public/blog/スラッグ/*.webp` | `/blog/スラッグ/*.webp` |
| 実績の画像 | `public/works/スラッグ/*.webp` | `/works/スラッグ/*.webp` |

- スラッグは半角の英小文字・数字・`-`・`_` だけ。記事と実績で同じスラッグは使えない。固定ページ名（`website` `app` `plan` `company` `works` `blog` `contact` など）も不可。
- 現サイト（WordPress）から引き継いだ記事・実績のスラッグは **変えない**（検索評価と外部リンクを守るため）。
- 先頭が `_` のファイル（`_template.mdx`）は読み込まれない。

### ブログのフロントマター

```yaml
---
title: "採用サイトの費用相場と、安く作るための3つのコツ"   # 32文字前後。悩み＋答え
excerpt: "…80〜120文字。検索結果と一覧に出る"               # 20〜160文字（範囲外はビルドエラー）
category: "採用"            # src/lib/content.ts の postCategories のどれか
publishedAt: 2026-10-25     # YYYY-MM-DD
updatedAt: 2026-11-02       # 任意。見直したら更新
eyecatch: /blog/スラッグ/cover.webp   # 任意。1200×630。無ければタイトルの図案
eyecatchAlt: "説明"         # 任意
draft: true                 # 任意
---
```

カテゴリを増やすときは `src/lib/content.ts` の `postCategories` に追加する。

### 制作実績のフロントマター

`content/works/_template.mdx` を参照。`title` `client`（「様」まで）`industry` `category`（`web` `app` `sales` `design`）`summary` `publishedAt` が必須。`challenge` `solution` `result` は詳細ページで「ご相談の内容 → 行ったこと → 公開後の変化」の3枚のカードになる。`gallery` の縦長画像（高さ÷幅 > 1.3）は枠内でスクロール表示になる。

### 記事で使える部品

Markdown（見出し・箇条書き・表・リンク・`![説明](/blog/…)`）に加えて、次の部品が使える。定義は `src/components/post/mdx-components.tsx`。

| 部品 | 用途 | 書き方 |
|---|---|---|
| `<Lead>` | 冒頭の導入（記事に1つ） | `<Lead>2〜3文</Lead>` |
| `<Point>` | 必ず持ち帰ってほしい要点 | `<Point title="ここが大事">…</Point>` |
| `<Note>` / `<Warn>` | 補足 / 注意 | `<Warn>…</Warn>` |
| `<Compare>` | ビフォー・アフター | `<Compare beforeLabel="…" before={["…"]} afterLabel="…" after={["…"]} />` |
| `<Cards>` + `<Card>` | 3〜6個の要素を並べる | `<Card icon="search" title="…">短文</Card>` |
| `<Steps>` + `<Step>` | 手順・流れ | `<Step title="…">1〜2文</Step>` |
| `<Stats>` | 数字で見せる | `<Stats items={[{ value: "3", unit: "倍", label: "応募数" }]} />` |
| `<Figure>` | 画像＋キャプション | `<Figure src="/blog/…/1.webp" alt="…" caption="…" />` |
| `<Faq>` | よくある質問 | `<Faq q="質問">答え</Faq>` |
| `<Cta>` | 相談への案内（記事の中盤に1つ） | `<Cta />` |
| `<Summary>` | 最後のまとめ（箇条書き） | `<Summary>\n- …\n</Summary>` |

`<Card icon>` に使える名前は `src/components/ui/icons.tsx` の一覧（brand people app search pen chat shield eye tap mobile chart up clock sync doc camera mail lock globe image blog support layout handshake check arrow）。

### 文章のルール（サイト全体のトーンに合わせる）

- **資料デザインのように書く。** 長い説明文より、短い言葉＋図（Compare / Cards / Steps / Stats）で見せる。
- 見出しは `##`（目次になる）と `###` だけ。`#` は使わない（ページのタイトルが h1）。
- 1段落は3文まで。1文は60文字前後まで。結論 → 理由 → 具体例の順。
- 読者は主に **建設業・中小企業の経営者や採用担当**。専門用語は言い換えるか、最初に一言で説明する。
- 「〜と思います」「〜かもしれません」を重ねない。言い切る。誇張（「絶対」「必ず」「No.1」）や根拠のない数字は書かない。数字を出すときは出典か自社の実績を添える。
- 他社の文章や画像を転載しない。引用は短く、出典を書く。
- お客様の名前・声・数字は、掲載の許可を取ったものだけ。
- 構成の目安：`<Lead>` → 結論の `##` → 図解の `##` を2〜3個 → `<Cta />` → `## よくある質問` → `<Summary>`。2,000〜4,000字。

### 画像

- 形式は WebP、横幅は最大1600px。`npm run images -- 元の画像 出力先` で変換できる（向きの補正・縮小・WebP化）。
- ファイル名は半角英数字。`alt` には画像の内容を書く（飾りなら空でよい）。
- スクリーンショットに個人情報や他社の情報が写っていないか確認する。

---

## 開発メモ

- 記事と実績の読み込み・検証：`src/lib/entries.ts`（フロントマターの型は zod で検証。誤りはビルドエラー）
- MDX の変換：`src/lib/mdx.tsx`（remark-gfm・rehype-slug、h2/h3 から目次を作る）
- 記事ページ：`src/components/post/PostArticle.tsx`、実績ページ：`WorkArticle.tsx`、URL は `src/app/[slug]/page.tsx`
- 秘密情報は環境変数（`.env.example`）。コードやコンテンツに書かない。
- 確認：`npm run typecheck` → `npm run build`
