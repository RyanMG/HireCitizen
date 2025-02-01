import { getRelativeTime } from "@utils/dateUtils";
import { TJobMessage } from "@definitions/messages";

export default function JobMessage({ message }: { message: TJobMessage }) {

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2">
        <p className="text-gray-900 text-md font-semibold">{message.sender.handle}</p>
        <p className="text-gray-600 text-md">{message.content}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm italic">{getRelativeTime(message.createdAt)}</p>
      </div>
    </div>
  );
}
