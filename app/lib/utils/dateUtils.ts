import DayJs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

DayJs.extend(relativeTime);
DayJs.extend(utc);

export function getJobDateFormatted(jobStart: string | undefined):string {
  if (jobStart) {
    return `${DayJs(jobStart).format('ddd MMM DD, YYYY')} - ${DayJs(jobStart).format('h:mm a')}`;
  }
  return 'No job start time provided.';
}

/**
 * Formats the estimated time to a human readable format.
 */
export function getEstimatedTime(estimatedTime: number | undefined) {
  if (estimatedTime) {
    const hours = Math.round(estimatedTime / 60);
    return hours > 1 ? `${hours} hours` : hours === 1 ? '1 hour' : `${hours} minutes`;
  }
  return '1 hour';
}

export function getRelativeTime(messageDate: string) {
  const messageDateToUTC = new Date(messageDate).toISOString();
  const diff = DayJs(messageDateToUTC).diff(new Date().toISOString(), 'seconds');
  const timeAgo = diff / 60;
  return timeAgo > 1 ? `${timeAgo} minutes ago` : timeAgo === 1 ? '1 minute ago' : `${timeAgo} seconds ago`;
}
