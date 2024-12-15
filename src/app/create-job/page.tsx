'use client'

import PageHeader from "@/components/pageHeader";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { getJobTypeCategories } from "@/api/jobApi";
import CreateJobPage1 from "./createJobPage1";
import { useState } from "react";
import { FormData } from "@/types/Forms";
import dayjs from "dayjs";
import CreateJobPage2 from "./createJobPage2";

const defaultFormData:FormData = {
  jobTitle: "",
  jobDescription: "",
  jobType: "",
  payout: "",
  payType: "",
  jobDate: dayjs(),
  startTime: dayjs(),
  timezone: "",
  jobPrivacy: "PUBLIC",
  reputationGate: false,
  crewRoles: []
};

export default function CreateJob() {

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [page, setPage] = useState<number>(1);

  const { data: jobTypeCategories, isLoading, error } = useQuery({
    queryKey: [`job-type-categories`],
    queryFn: () => getJobTypeCategories()
  });

  const submitForm = () => {
    console.log(formData);
  }

  return (
    <div className="flex flex-col p-4">
      <PageHeader
        showBackButton={page === 2}
        title="Create A Job"
        pageBackFn={() => {
          setPage(1);
        }}
      />
      {isLoading && <Loading />}
      {error && <div>Error</div>}

      {!isLoading && !error && page === 1 ? (
        <CreateJobPage1
          returnFormData={(pageOneFormData) => {
            setFormData(pageOneFormData);
            setPage(2);
          }}
          jobTypeCategories={jobTypeCategories} />
      ) : (
        <CreateJobPage2
          formData={formData}
          submitForm={submitForm}
        />
      )}

    </div>
  );
}