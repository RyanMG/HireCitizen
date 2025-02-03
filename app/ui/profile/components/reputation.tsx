import ReputationBar from "./reputationBar";
import { TPerson, TReputation } from "@/app/lib/definitions/person";

export default function Reputation({
  person,
  employeeText,
  employerText
}: {
  person: TPerson,
  employeeText: string,
  employerText: string
}) {
  const employeeReputation = person?.employee_reputation as TReputation;
  const employerReputation = person?.employer_reputation as TReputation;

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="flex flex-col gap-2 w-1/2">
        <ReputationBar title={employeeText} reputation={employeeReputation} />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <ReputationBar title={employerText} reputation={employerReputation} />
      </div>
    </div>
  );
}
