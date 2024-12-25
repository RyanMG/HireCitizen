import PageHeader from "@components/pageHeader";
// import { getJobTypeCategories, saveNewJob } from "@/api/jobApi";
// import CreateJobPage1 from "@ui/createJob/createJobPage1";
// import { FormData } from "@/types/Forms";
// import dayjs from "dayjs";
// import CreateJobPage2 from "@ui/createJob/createJobPage2";

// const defaultFormData:FormData = {
//   jobTitle: "",
//   jobDescription: "",
//   jobType: "",
//   payout: "",
//   payType: "",
//   jobDate: dayjs(),
//   startTime: dayjs(),
//   estimatedTime: 0,
//   timezone: "",
//   jobPrivacy: "PUBLIC",
//   reputationGate: false,
//   crewRoles: []
// };

export default function CreateJob() {

  return (
    <div className="flex flex-col p-4">
      <PageHeader
        // showBackButton={page === 2}
        title="Create A Job"
        // pageBackFn={() => {
        //   // setPage(1);
        // }}
      />
        {/* <CreateJobPage1
          returnFormData={(pageOneFormData) => {
            setFormData(pageOneFormData);
            setPage(2);
          }}
          jobTypeCategories={jobTypeCategories} />
      ) : (
        <CreateJobPage2
          formData={formData}
          setFormData={setFormData}
        />
      )} */}

    </div>
  );
}