import { Job, JobTypeCategory } from "@/types/Job";

interface ISearchJobsProps {
  searchText: string,
  filters?: string[]
}

export async function searchJobs({
  searchText,
  filters
}:ISearchJobsProps):Promise<Job[]> {
  try {
    const params = new URLSearchParams();
    params.set("searchTerm", searchText);

    if (filters) {
      params.set("filter", filters.join(","));
    }

    const res:Job[] = await fetch(`http://localhost:3030/api/jobs?${params}`)
      .then((res) =>
        res.json()
      );

    return res;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getJob({ jobId }: { jobId: number }): Promise<Job> {
  try {
    const res: Job = await fetch(`http://localhost:3030/api/jobs/${jobId}`)
      .then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getJobTypeCategories(): Promise<JobTypeCategory[]> {
  try {
    const res: JobTypeCategory[] = await fetch(`http://localhost:3030/api/jobs/categories`)
      .then((res) => res.json());

    return res;

  } catch (error) {
    console.error(error);
    throw error;
  }
}