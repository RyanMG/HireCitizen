import { getJobApplicants } from "@/app/lib/query/jobRoles/data";
import { Job } from "@/app/lib/definitions/job";
import SectionHeader from "@components/sectionHeader";

import ApplicationCard from "./roleApplicationCard";
import NotificationSnackbar from "@components/notificationSnackbar";

const CrewRoleApplicationHeaderView = () => {
  return (
    <>
      <h2 className="text-white text-lg font-semibold mb-4">Crew Role Applications</h2>
    </>
  );
}

const CrewRoleNotificationTextView = (props: { text: string }) => {
  return (
    <p className="text-gray-400 text-center italic">{props.text}</p>
  );
}

const PendingView = () => {
  return (
    <>
      <CrewRoleApplicationHeaderView />
      <CrewRoleNotificationTextView text="Fill out all needed job data and mark this job active to allow citizens to apply." />
    </>
  );
}

export default async function CrewRoleApplications({ job }: { job: Job }) {
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
      <CrewRoleApplicationHeaderView />

      {applications.length === 0 &&
        <CrewRoleNotificationTextView text="No applications yet submitted for this job." />
      }
      {applicationDisplay['ACCEPTED'] && applicationDisplay['ACCEPTED'].length > 0 &&
        <div>
          <SectionHeader title="Accepted" />
          {applicationDisplay['ACCEPTED']}
        </div>
      }
      {applicationDisplay['PENDING'] && applicationDisplay['PENDING'].length > 0 &&
        <div>
          <SectionHeader title="Pending" />
          {applicationDisplay['PENDING']}
        </div>
      }
      {applicationDisplay['REJECTED'] && applicationDisplay['REJECTED'].length > 0 &&
        <div>
          <SectionHeader title="Rejected" />
          {applicationDisplay['REJECTED']}
        </div>
      }
    </div>
  )
}
