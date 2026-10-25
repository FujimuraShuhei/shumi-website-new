import "server-only";
import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Heading } from "./content";

type HastNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HastNode[] };

const textOf = (n: HastNode): string => (n.type === "text" ? (n.value ?? "") : (n.children ?? []).map(textOf).join(""));

/** h2・h3 を集めて目次にする（rehype-slug が付けた id を使う） */
function collectHeadings(out: Heading[]) {
  return () => (tree: HastNode) => {
    const walk = (n: HastNode) => {
      if (n.type === "element" && (n.tagName === "h2" || n.tagName === "h3") && n.properties?.id) {
        out.push({ id: String(n.properties.id), text: textOf(n).trim(), level: n.tagName === "h2" ? 2 : 3 });
      }
      n.children?.forEach(walk);
    };
    walk(tree);
  };
}

/**
 * MDX をビルド時に React の要素へ変換する。
 * 本文はリポジトリ内のファイル（自分たちが書いたもの）だけなので、そのまま実行してよい。
 */
export async function renderMdx(source: string, components: MDXComponents, file = "MDX") {
  const headings: Heading[] = [];
  try {
    const { default: Content } = await evaluate(source, {
      ...(runtime as unknown as Parameters<typeof evaluate>[1]),
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, collectHeadings(headings)],
    });
    return { content: <Content components={components} />, headings };
  } catch (e) {
    throw new Error(`${file} の本文を読み込めません：${e instanceof Error ? e.message : String(e)}`);
  }
}
