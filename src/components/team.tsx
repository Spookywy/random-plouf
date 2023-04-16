import classNames from "classnames";

type TeamProps = {
  team: Array<string>;
  teamIndex: number;
};

export default function Team({ team, teamIndex }: TeamProps) {
  return (
    <div className="mb-5 text-center">
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
        Team {teamIndex + 1}
      </p>
      {team.map((member, index) => (
        <p className="text-2xl font-semibold" key={index}>
          {member}
        </p>
      ))}
    </div>
  );
}