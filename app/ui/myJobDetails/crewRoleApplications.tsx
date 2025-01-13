import { getJobApplicants } from "@/app/lib/query/jobRoles/data";
import { Job } from "@definitions/job";
import ApplicationCard from "./roleApplicationCard";
import NotificationSnackbar from "../components/notificationSnackbar";

export default async function CrewRoleApplications({ job }: { job: Job }) {

  const applications = await getJobApplicants(job.id);

  if ('error' in applications) {
    return <NotificationSnackbar type="error" messages={[applications.error]} />
  }

  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">Crew Role Applications</h2>
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}
