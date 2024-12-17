'use client'

import PageHeader from "@/components/pageHeader";
import Loading from "@/components/loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobTypeCategories, saveNewJob } from "@/api/jobApi";
import CreateJobPage1 from "./createJobPage1";
import { useState, useEffect } from "react";
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
  estimatedTime: 0,
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

  const saveMutation = useMutation({
    mutationFn: () => {
      const jobStart = formData.jobDate.toDate().getTime();
      const newJob = {
        title: formData.jobTitle,
        description: formData.jobDescription,
        jobType: formData.jobType,
        jobStart,
        estimatedTime: formData.estimatedTime,
        amountPaid: formData.payout,
        payType: formData.payType,
        reputationGate: formData.reputationGate,
        jobPrivacy: formData.jobPrivacy,
        crewRoles: formData.crewRoles || []
      } as unknown as FormData;
      return saveNewJob(newJob);
    }
  });

  useEffect(() => {
    if (formData.crewRoles && formData.crewRoles.length > 0) {
      console.log('saving form data');
      saveMutation.mutate();
    }
  }, [formData]);

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
          setFormData={setFormData}
        />
      )}

    </div>
  );
}