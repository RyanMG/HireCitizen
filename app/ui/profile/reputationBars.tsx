import { Reputation } from "@/app/lib/definitions/person";
import clsx from "clsx";

export default function ReputationBar({
  reputation,
  title
}: {
  reputation: Reputation;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-300 text-md">{title}</p>
      <div className="w-full h-5 bg-gray-800 rounded-full my-1">
        {reputation === 0 && (
          <div className="text-center text-white h-full text-xs">No history available</div>
        )}
        <div style={{ width: `${(reputation / 10) * 100}%` }} className={clsx("text-white rounded-l-full h-full",
          {
            'bg-red-900': reputation === 1,
            'bg-red-700': reputation === 2,
            'bg-yellow-700': reputation === 3,
            'bg-yellow-500': reputation === 4,
            'bg-yellow-300': reputation === 5,
            'bg-green-800': reputation === 6,
            'bg-green-700': reputation === 7,
            'bg-green-600': reputation === 8,
            'bg-green-500': reputation === 9,
            'bg-green-400 rounded-r-full': reputation === 10
          }
        )}></div>
      </div>
    </div>
  );
};
