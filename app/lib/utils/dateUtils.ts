import DayJs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

DayJs.extend(relativeTime);

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
  return DayJs(messageDate).fromNow();
}
