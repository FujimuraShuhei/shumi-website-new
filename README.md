# Shumiデザイン 公式サイト

横浜市のブランディング・ホームページ制作「Shumi（しゅうみ）」のサイトです。
現サイト（WordPress）の **ページ構成・URL・ブランド（ロゴ／ティールの配色）を引き継ぎ**、業務効率化アプリ・営業ツール開発を加えてリニューアルしました。

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4（色・文字のトークンは `src/app/globals.css` の `@theme`）
- フォント：Noto Sans JP（本文・見出しは Black）、Inter Tight（英字見出し）、Inter（数字・日付）
- GSAP（トップの3章スクロールと、自動で操作される3つのモック）
- ブログ・制作実績は `content/` の MDX ファイル（CMSなし。コードで書いて PR → マージで公開）
- Resend（問い合わせメール送信）→ Gmail で受信、Cloudflare Turnstile（スパム対策）
- Vercel にデプロイ

環境変数が空でも表示・ビルドできます。

```bash
npm install
cp .env.example .env.local   # 必要な値を入れる
npm run dev                  # http://localhost:3000
npm run build
```

---

## ページとURL（現サイトと同じURL）

| ページ | URL |
|---|---|
| ホーム | `/` |
| サイト制作内容 | `/website/` |
| 建設・建築業特化サイト制作 | `/construction_industry_website/` |
| コーポレートサイト制作 | `/website/corpolate/` |
| 集客ができるサイト制作 | `/website/service_site/` |
| 採用応募を増やすサイト制作 | `/website/recruit_website/` |
| **業務アプリ開発（新設）** | `/app/` |
| **業務アプリのデモ（新設）** | `/app/demo/` |
| 制作プラン | `/plan/` |
| しゅうみについて | `/company/` |
| デザイン制作 | `/design_all/` |
| HP制作実績 | `/works/` |
| ブログ | `/blog/` |
| お役立ち資料 | `/document/` |
| お問い合わせ | `/contact/` |
| プライバシーポリシー／利用規約 | `/privacy-policy/` ／ `/regalpage/` |
| ブログ記事・制作実績の詳細 | `/{スラッグ}/`（例：`/contact_point_9/`、`/uchida_koji_works/`） |

URLが変わらないので、検索の評価や外部からのリンクをそのまま引き継げます。旧ブログの月別アーカイブ（`/2023/10/` など）とカテゴリは `/blog/` へ転送します。

---

## 環境変数

`.env.example` に一覧があります。Vercel の Project Settings → Environment Variables に登録してください。

- `NEXT_PUBLIC_` で始まるもの：サイトに表示される公開情報（会社名、所在地、営業時間など）
- それ以外：APIキー・シークレット・受信用メールアドレス。**サイトにもブラウザにも出ません**

会社情報（代表者名・所在地・メール表示など）も環境変数で切り替えられます。空の項目は表示されません。

---

## 公開までの手順

### 1. GitHub と Vercel

1. このフォルダを GitHub のリポジトリに push
2. Vercel で「Add New → Project」からリポジトリを選ぶ（設定はそのまま）
3. 環境変数を登録して Deploy
4. Domains に `shumiofficial.com` を追加し、表示されるDNS設定をドメイン管理会社で行う（切り替えた時点で新サイトになります）

### 2. ブログと制作実績（CMSなし・ファイルで管理）

記事と実績は `content/blog/` と `content/works/` の MDX ファイルです。書き方・使える部品・文章のルールは **`CLAUDE.md`** にまとめています（Claude に「ブログ記事を書いて」と頼むと、このルールに沿って書きます）。

```bash
npm run new:post -- スラッグ            # 記事をテンプレートから作る（content/blog/スラッグ.mdx）
npm run new:work -- スラッグ            # 制作実績を作る（content/works/スラッグ.mdx）
npm run images -- 元の画像 public/blog/スラッグ   # 画像をWebP・最大1600pxに変換
npm run build                           # 書式の誤り・画像の置き忘れがあればここで止まる
```

ブランチで書いて PR を作ると Vercel のプレビューURLで確認でき、main にマージすると公開されます。`draft: true` の記事は本番に出ません。

### 3. メール（Resend で送信 → いまの Gmail で受信）

1. https://resend.com でアカウント作成 → Domains に `shumiofficial.com` を追加
2. 表示されるDNSレコード（SPF・DKIM、推奨のDMARC）をドメイン管理会社で追加
3. 「Sending access」のAPIキーを `RESEND_API_KEY` に
4. `CONTACT_TO` に通知を受け取る Gmail アドレス

- Gmail に届いた通知に **そのまま返信するとお客様に届きます**
- お客様には自動返信が届き、お客様が返信すると Gmail に届きます

### 4. スパム対策（Cloudflare Turnstile）

Cloudflare → Turnstile → Add widget。ドメインに `shumiofficial.com` と、プレビュー確認用に `vercel.app` を追加。
Site Key を `NEXT_PUBLIC_TURNSTILE_SITE_KEY`、Secret Key を `TURNSTILE_SECRET_KEY` に。

### 5. 連続送信の制限（推奨）

Vercel → Storage → Marketplace から Upstash Redis を追加すると、必要な環境変数が自動で入ります。

---

## よく触る場所

| やりたいこと | ファイル |
|---|---|
| ブログ記事・制作実績 | `content/blog/`、`content/works/`（書き方は `CLAUDE.md`） |
| 記事で使える部品（図解・まとめ・FAQなど） | `src/components/post/mdx-components.tsx` |
| サービス名・強み・流れなどの文章 | `src/lib/site.ts` |
| 各サイト制作ページの文章 | `src/lib/service-pages.ts` |
| 色・フォント | `src/app/globals.css` |
| ロゴ | `src/components/layout/Logo.tsx`（現ロゴをベクター化したもの）、`public/logo.svg` |
| トップの最初（夜色の3章スクロール） | `src/components/home/HomeStory.tsx` |
| 動くモック（ブランドサイト・採用サイト・業務アプリ） | `src/components/mocks/` |
| 3本柱と還元の循環図 | `src/components/home/Pillars.tsx` |
| 業務アプリのデモ | `src/components/demos/`（一覧は `registry.ts`） |
| フォームの項目 | `src/lib/contact-schema.ts`、`src/components/forms/InquiryForm.tsx` |
| メールの文面 | `src/lib/mail.ts` |
| セキュリティヘッダー | `next.config.ts` |

## セキュリティ

- HTTPS強制（HSTS）、CSP、クリックジャッキング対策などのヘッダー、JSの改ざん検知（SRI）
- フォーム：サーバー側の入力検証、ボット用の隠し欄、Turnstile、連続送信の制限、メール本文のエスケープ
- 鍵類はすべて環境変数。お問い合わせの内容はどこにも保存せず、メールで届くだけ
- Vercel のプレビュー環境は検索エンジンに載せない

## 公開前チェック

- [ ] 環境変数（特に `NEXT_PUBLIC_COMPANY_REPRESENTATIVE` など会社情報）
- [ ] ブログ記事の本文と画像を確認（現サイトから移行済み）
- [ ] プライバシーポリシー・利用規約を現サイトの内容と照合
- [ ] 制作プランの文言とオプション料金
- [ ] フォームから実際に送信し、Gmailの通知と自動返信を確認
