import { useTranslation } from "@/app/i18n";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, "numbers");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
}
