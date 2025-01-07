'use server';

import { initialCap } from "@/app/lib/utils/textUtils";
import JobForm from "../createJob/jobForm";
import { getJobById, getJobTypeCategories } from "@/app/lib/query/job/data";
import { FormOption } from "@/app/lib/definitions/misc";

export default async function EditJobForm(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const job = await getJobById(params.id);
  const jobTypeCategories = await getJobTypeCategories();

  if ('message' in jobTypeCategories) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{jobTypeCategories.message}</p>;
  }

  if ('message' in job) {
    return <p className="flex flex-col items-center justify-center flex-1 text-white">{job.message}</p>;
  }

  const buildJobCategoryOptions = () => {
    const options = jobTypeCategories
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((category) => ({ label: initialCap(category.name), value: category.id.toString() })) || [];
    return options as FormOption[];
  }

  return (
    <>
      <JobForm jobTypeCategories={buildJobCategoryOptions()} job={job} />
    </>
  )
}
