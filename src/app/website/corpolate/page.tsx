import type { Metadata } from "next";
import { ServiceDetail } from "@/components/pages/ServiceDetail";
import { servicePages } from "@/lib/service-pages";

const page = servicePages.corporate;

export const metadata: Metadata = { title: page.name, description: page.description };

export default function Page() {
  return <ServiceDetail page={page} />;
}
