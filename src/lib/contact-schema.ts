import { z } from "zod";

export const topics = ["ホームページ制作・リニューアル", "業務アプリ・営業ツールの開発", "デザイン制作", "お見積りのみ", "その他"] as const;
export const documentsList = ["Shumiのサイト制作がわかる資料（成功事例・料金プラン）", "工務店・建築企業の集客施策まとめ", "業務アプリ導入の進め方"] as const;

/** 改行やタブを1つの空白にまとめる（件名や名前に改行を入れさせない） */
const oneLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\r\n\t]+/g, " ").trim())
    .pipe(z.string().max(max, `${max}文字以内で入力してください`));

const base = {
  name: oneLine(50).pipe(z.string().min(1, "お名前を入力してください")),
  company: oneLine(100).optional().default(""),
  email: z.string().trim().pipe(z.email("メールアドレスの形式で入力してください（例：taro@example.com）")).pipe(z.string().max(254)),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9０-９+\-−() ]{0,20}$/, "電話番号は数字とハイフンで入力してください")
    .optional()
    .default(""),
  privacy: z.literal("on", { error: "プライバシーポリシーへの同意が必要です" }),
};

export const contactSchema = z.object({
  kind: z.literal("contact"),
  ...base,
  company: oneLine(100).pipe(z.string().min(1, "会社名を入力してください")),
  topic: z.enum(topics, { error: "ご相談の内容を選んでください" }),
  message: z.string().trim().min(1, "ご相談の内容を入力してください").max(3000, "3000文字以内で入力してください"),
});

export const documentSchema = z.object({
  kind: z.literal("document"),
  ...base,
  company: oneLine(100).pipe(z.string().min(1, "会社名を入力してください")),
  documents: z.array(z.enum(documentsList)).min(1, "資料を1つ以上選んでください"),
  message: z.string().trim().max(3000).optional().default(""),
});

export const formSchema = z.discriminatedUnion("kind", [contactSchema, documentSchema]);
export type FormInput = z.infer<typeof formSchema>;

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: Record<string, string | string[]>;
};
