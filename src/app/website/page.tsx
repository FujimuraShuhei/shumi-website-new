import type { Metadata } from "next";
import { FlowSteps, ServiceRows } from "@/components/home/Sections";
import { Button, ContactCta, Heading, PageHero } from "@/components/ui";
import { appServices, websiteServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "サイト制作内容",
  description: "Shumiのサイト制作内容。建設・建築業特化サイト、コーポレートサイト、集客サイト、採用サイトの制作と、業務アプリ開発を行っています。",
};

export default function WebsitePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "サイト制作内容" }]}
        en="Website"
        title="サイト制作内容"
        lead="サービスの魅力と企業のブランド力を最大限に引き出すWebサイトを制作します。目的に合わせて、4つのサイト制作をご用意しています。"
      />
      <section aria-labelledby="list-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="Service" id="list-title" title="Shumiのサイト制作について" />
          <div className="mt-16">
            <ServiceRows items={websiteServices} />
          </div>
        </div>
      </section>
      <section aria-labelledby="app-title" className="bg-mist py-28 md:py-40">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Heading
              en="Business app"
              id="app-title"
              title="業務アプリ開発もはじめました"
              lead="Webサイトで集めたお客様を、社内でどう迎えるか。日報や案件管理、営業の顧客管理など、社内の仕事を軽くするアプリも開発しています。"
            />
            <Button href="/app/demo/" variant="secondary" className="mt-10">
              デモを触る
            </Button>
          </div>
          <div className="lg:pt-6">
            <ServiceRows items={appServices.filter((a) => a.href !== "/app/demo/")} />
          </div>
        </div>
      </section>
      <section aria-labelledby="flow-title" className="bg-paper py-28 md:py-40">
        <div className="wrap">
          <Heading en="Flow" id="flow-title" title="制作の流れ" />
          <div className="mt-16">
            <FlowSteps />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
