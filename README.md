# Shumiデザイン 公式サイト

横浜市のブランディング・ホームページ制作「Shumi（しゅうみ）」のサイトです。
現サイト（WordPress）の **ページ構成・URL・ブランド（ロゴ／ティールの配色）を引き継ぎ**、業務効率化アプリ・営業ツール開発を加えてリニューアルしました。

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4（色・文字のトークンは `src/app/globals.css` の `@theme`）
- フォント：Noto Sans JP（本文・見出し）、Inter（英字）
- GSAP（トップの3章スクロールと、自動で操作される3つのモック）
- microCMS（ブログ・制作実績）
- Resend（問い合わせメール送信）→ Gmail で受信、Cloudflare Turnstile（スパム対策）
- Vercel にデプロイ

環境変数が空でも、サンプルデータで表示・ビルドできます。

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

### 2. microCMS

API を2つ作成します（リスト形式）。**コンテンツIDを現サイトのURLのスラッグと同じにしてください。**

**制作実績** — エンドポイント `works`

| フィールドID | 表示名 | 種類 |
|---|---|---|
| title | タイトル（例：コーポレートサイト制作） | テキストフィールド |
| client | お客様名（例：内田工事株式会社様） | テキストフィールド |
| industry | 業種（例：建設業） | テキストフィールド |
| category | 種類 | セレクト・複数選択（`web` / `app` / `sales` / `design`） |
| summary | 概要 | テキストエリア |
| challenge | ご相談の内容 | テキストエリア |
| solution | 行ったこと | テキストエリア |
| result | 公開後の変化 | テキストエリア |
| thumbnail | サムネイル（16:10推奨） | 画像 |
| url | 公開URL | テキストフィールド |
| body | 本文 | リッチエディタ |

**ブログ** — エンドポイント `blog`

| フィールドID | 表示名 | 種類 |
|---|---|---|
| title | タイトル | テキストフィールド |
| category | カテゴリ | テキストフィールド |
| excerpt | 概要（検索結果の説明文） | テキストエリア |
| eyecatch | アイキャッチ（1200×630） | 画像 |
| body | 本文 | リッチエディタ |

- **APIキー**：「GET」だけを許可したキーを `MICROCMS_API_KEY` に
- **Webhook**：API設定 → Webhook → カスタム通知
  - URL：`https://shumiofficial.com/api/revalidate/`（末尾のスラッシュまで入れてください）
  - シークレット値：`MICROCMS_WEBHOOK_SECRET` と同じ文字列
  - 公開・更新した内容がすぐサイトに反映されます

お問い合わせの内容は microCMS には保存しません（個人情報をCMSに置かないため）。

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
- microCMS の Webhook は署名を検証
- 鍵類はすべて環境変数。microCMS のキーは読み取り専用
- Vercel のプレビュー環境は検索エンジンに載せない

## 公開前チェック

- [ ] 環境変数（特に `NEXT_PUBLIC_COMPANY_REPRESENTATIVE` など会社情報）
- [ ] microCMS に制作実績とブログを移行（サムネイル画像も）
- [ ] プライバシーポリシー・利用規約を現サイトの内容と照合
- [ ] 制作プランの文言とオプション料金
- [ ] フォームから実際に送信し、Gmailの通知と自動返信を確認
