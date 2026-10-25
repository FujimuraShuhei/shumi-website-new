// 新しい記事・制作実績のファイルをテンプレートから作る
//   npm run new:post -- スラッグ      → content/blog/スラッグ.mdx と public/blog/スラッグ/
//   npm run new:work -- スラッグ      → content/works/スラッグ.mdx と public/works/スラッグ/
import fs from "node:fs";
import path from "node:path";

const [kind, slug] = process.argv.slice(2);
const dir = kind === "work" ? "works" : "blog";
if (!slug || !/^[a-z0-9][a-z0-9_-]*$/.test(slug)) {
  console.error("スラッグ（URL）を半角の英小文字・数字・-・_ で指定してください。例：npm run new:post -- recruit-site-cost");
  process.exit(1);
}
const file = path.join("content", dir, `${slug}.mdx`);
if (fs.existsSync(file)) {
  console.error(`${file} はすでにあります`);
  process.exit(1);
}
const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(new Date());
const template = fs.readFileSync(path.join("content", dir, "_template.mdx"), "utf8").replaceAll("__SLUG__", slug).replaceAll("__TODAY__", today);
fs.writeFileSync(file, template);
fs.mkdirSync(path.join("public", dir, slug), { recursive: true });
console.log(`作成しました：${file}（画像は public/${dir}/${slug}/ へ）`);
