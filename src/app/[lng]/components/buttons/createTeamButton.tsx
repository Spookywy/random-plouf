import { useTranslation } from "@/app/i18n/client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CreateTeamButtonProps = {
  numberOfTeams: number;
  handleNumberOfTeamsChanged: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  createRandomTeams: () => void;
  disabled?: boolean;
  lng: string;
};

export default function CreateTeamButton({
  numberOfTeams,
  handleNumberOfTeamsChanged,
  createRandomTeams,
  disabled,
  lng,
}: CreateTeamButtonProps) {
  const possibleNumberOfTeam = Array.from(
    { length: 4 },
    (_, index) => index + 2
  );

  const { t } = useTranslation(lng);

  return (
    <div className="flex w-72">
      <div className="relative">
        <select
          value={numberOfTeams}
          onChange={handleNumberOfTeamsChanged}
          className="h-10 w-12 appearance-none rounded-none rounded-l border-r border-neutral-400 bg-neutral-700 pl-3 text-neutral-100"
        >
          {possibleNumberOfTeam.map((numbeOfTeam) => (
            <option key={numbeOfTeam} value={numbeOfTeam}>
              {numbeOfTeam}
            </option>
          ))}
        </select>
        <FontAwesomeIcon
          icon={faAngleDown}
          className="pointer-events-none absolute right-2 top-3 text-white"
        />
      </div>
      <button
        disabled={disabled}
        onClick={createRandomTeams}
        className="h-10 flex-grow rounded-r bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
        dangerouslySetInnerHTML={{
          __html: t("createRandomTeams", {
            numberOfTeams: numberOfTeams,
          }),
        }}
      />
    </div>
  );
}
