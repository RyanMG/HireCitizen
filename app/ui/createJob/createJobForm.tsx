import { getJobTypeCategories, getTimezones } from "@/app/lib/query/job/data";
import JobForm from '@ui/createJob/jobForm';
import { FormOption } from "@definitions/misc";

import { initialCap } from "@lib/utils/textUtils";

export default async function CreateJobForm() {
  const [jobTypeCategories, timeZones] = await Promise.all([getJobTypeCategories(), getTimezones()]);

  if ('message' in jobTypeCategories) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{jobTypeCategories.message}</p>;
  }

  if ('message' in timeZones) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{timeZones.message}</p>;
  }

  const buildJobCategoryOptions = () => {
    const options = jobTypeCategories
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((category) => ({ label: initialCap(category.name), value: category.id.toString() })) || [];
    return options as FormOption[];
  }

  const buildTimezoneOptions = () => {
    const options = timeZones
      .sort((a, b) => a.utc_offset - b.utc_offset)
      .map((timezone) => ({ label: timezone.name, value: timezone.id.toString() })) || [];
    return options as FormOption[];
  }

  return (
    <>
      <JobForm jobTypeCategories={buildJobCategoryOptions()} timeZones={buildTimezoneOptions()} />
    </>
  );
}
