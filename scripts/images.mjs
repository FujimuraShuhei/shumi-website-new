// 画像をサイト用に変換する（WebP・横幅最大1600px）
//   npm run images -- 元の画像やフォルダ… 出力先フォルダ
//   例：npm run images -- ~/Downloads/shots public/blog/recruit-site-cost
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("使い方：npm run images -- 元の画像やフォルダ… 出力先フォルダ");
  process.exit(1);
}
const out = args.pop();
fs.mkdirSync(out, { recursive: true });
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tif", ".tiff"]);
const inputs = args.flatMap((a) => (fs.statSync(a).isDirectory() ? fs.readdirSync(a).map((f) => path.join(a, f)) : [a]));
for (const file of inputs.filter((f) => exts.has(path.extname(f).toLowerCase()))) {
  const name = path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-|-$/g, "") || "image";
  const dest = path.join(out, `${name}.webp`);
  const info = await sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(`${dest}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)}KB`);
}
