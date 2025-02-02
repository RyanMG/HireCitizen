import { getJobApplicants } from "@query/jobRoles/data";
import { TJob } from "@definitions/job";
import SectionHeader from "@components/sectionHeader";

import ApplicationCard from "@ui/employerPages/crewRoleApplications/roleApplicationCard";
import NotificationSnackbar from "@components/notificationSnackbar";

const CrewRoleNotificationTextView = (props: { text: string }) => {
  return (
    <p className="text-gray-400 text-center italic">{props.text}</p>
  );
}

const PendingView = () => {
  return (
    <>
      <CrewRoleNotificationTextView text="Fill out all needed job data and mark this job active to allow citizens to apply." />
    </>
  );
}

export default async function CrewRoleApplications({ job }: { job: TJob }) {
  if (job.status === 'PENDING') {
    return <PendingView />;
  }

  const applications = await getJobApplicants(job.id);

  if ('error' in applications) {
    return <NotificationSnackbar type="error" messages={[applications.error]} />
  }

  const applicationDisplay = applications.reduce((acc, application) => {
    const status = application.acceptedStatus || '';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(<ApplicationCard key={application.id} application={application} />);
    return acc;
  }, {} as { [key: string]: React.ReactNode[] });

  return (
    <div>
      {applicationDisplay['PENDING'] && applicationDisplay['PENDING'].length > 0 &&
        <div>
          <SectionHeader title="Pending Applications" />
          {applicationDisplay['PENDING']}
        </div>
      }
      {applicationDisplay['REJECTED'] && applicationDisplay['REJECTED'].length > 0 &&
        <div>
          <SectionHeader title="Rejected Applications" />
          {applicationDisplay['REJECTED']}
        </div>
      }
    </div>
  )
}
