import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * microCMS の Webhook を受けて、サイトの表示を即時に更新する。
 * microCMS 管理画面 → API設定 → Webhook → 「カスタム通知」に
 *   URL: https://（ドメイン）/api/revalidate
 *   シークレット値: MICROCMS_WEBHOOK_SECRET と同じ文字列
 * を設定してください。署名（X-MICROCMS-Signature）を検証し、なりすましを防ぎます。
 */
export async function POST(req: NextRequest) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "not configured" }, { status: 500 });

  const body = await req.text();
  const signature = req.headers.get("x-microcms-signature") ?? "";
  const expected = createHmac("sha256", secret).update(body).digest("hex");

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidateTag("microcms", "max");
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
