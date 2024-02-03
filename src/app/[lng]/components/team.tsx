import { useTranslation } from "@/app/i18n/client";
import classNames from "classnames";

type TeamProps = {
  team: Array<string>;
  teamIndex: number;
  isAnimated?: boolean;
  lng: string;
};

export default function Team({ team, teamIndex, isAnimated, lng }: TeamProps) {
  const { t } = useTranslation(lng);

  return (
    <div className={`mb-5 text-center ${isAnimated ? "animate-ping" : ""}`}>
      <p
        className={`mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent
              ${classNames({
                " from-blue-500 to-red-500": teamIndex === 0,
                " from-yellow-500 to-blue-500": teamIndex === 1,
                "from-blue-500 to-green-500": teamIndex === 2,
                "from-green-500 to-yellow-500": teamIndex === 3,
                "from-yellow-500 to-red-500": teamIndex === 4,
              })}`}
      >
        {t("team", { teamNumber: teamIndex + 1 })}
      </p>
      {team.map((member, index) => (
        <p className="text-2xl font-semibold" key={index}>
          {member}
        </p>
      ))}
    </div>
  );
}
