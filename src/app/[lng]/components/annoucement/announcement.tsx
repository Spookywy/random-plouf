import { useTranslation } from "@/app/i18n/client";
import { GOOGLE_PLAY_APP_URL } from "@/constants";
import clsx from "clsx";
import "./announcement.css";

type AnnouncementProps = {
  className?: string;
  lng: string;
};

export function Announcement({ className, lng }: AnnouncementProps) {
  const { t } = useTranslation(lng);

  return (
    <a
      className={clsx(className, "rainbow")}
      target="_blank"
      href={GOOGLE_PLAY_APP_URL}
    >
      <h3 className="mb-1 font-bold">{t("announcement.title")}</h3>
      <p className="text-sm">{t("announcement.description")}</p>
    </a>
  );
}
