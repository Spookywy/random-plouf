import { dir } from "i18next";
import type { Metadata } from "next";
import { useTranslation } from "../i18n";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  return {
    description: t("metadata.description"),
  };
}

export default async function TranslatedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <div lang={lng} dir={dir(lng)}>
      {children}
    </div>
  );
}
