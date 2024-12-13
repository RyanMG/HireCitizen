'use client'

import Button from "@/components/button";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import PageHeader from "@/components/pageHeader";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getJobTypeCategories } from "@/api/jobApi";
import initialCap from "@/utils/initialCap";
export default function CreateJob() {

  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [payout, setPayout] = useState<number>(0);
  const [payType, setPayType] = useState<string>("");
  const [jobDate, setJobDate] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [timezone, setTimezone] = useState<string>("");

  const { data: jobTypeCategories, isLoading, error } = useQuery({
    queryKey: [`job-type-categories`],
    queryFn: () => getJobTypeCategories()
  });

  const buildJobCategoryOptions = () => {
    const options = jobTypeCategories?.map((category) => ({ label: initialCap(category.name), value: category.id.toString() })) || [];
    options.unshift({ label: "Select Job Type", value: "0" });
    return options
  }

  const buildTimezoneOptions = () => {
    const options = [{ label: "EST", value: "EST" }, { label: "CST", value: "CST" }, { label: "MST", value: "MST" }, { label: "PST", value: "PST" }];
    return options
  }

  return (
    <div className="flex flex-col p-4">
      <PageHeader title="Create A Job" />
      {isLoading && <Loading />}
      {error && <div>Error</div>}

      {!isLoading && !error && (
        <form className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full">
          <FormInput
            label="Job Title"
          formValue={jobTitle}
          onChangeInput={(value) => setJobTitle(value)}
        />

        <FormSelect
          label="Job Type"
          formValue={jobType}
          onChangeInput={(value) => setJobType(value)}
          options={buildJobCategoryOptions()}
        />

        <FormInput
          label="Job Description"
          formValue={jobDescription}
          onChangeInput={(value) => setJobDescription(value)}
          textarea={true}
        />

        <FormInput
          label="Job Date"
          formValue={jobDate}
          onChangeInput={(value) => setJobDate(value)}
        />

        <div className="flex flex-row gap-4">
          <FormInput
            label="Start Time"
            type="number"
            width="50"
            formValue={startTime}
            onChangeInput={(value) => setStartTime(Number(value))}
          />
          <FormSelect
            label=""
            formValue={timezone}
            onChangeInput={(value) => setTimezone(value)}
            options={buildTimezoneOptions()}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormInput
            label="Payout"
            type="number"
            width="50"
            formValue={payout}
            onChangeInput={(value) => setPayout(Number(value))}
          />
          <FormSelect
            label=""
            formValue={payType}
            onChangeInput={(value) => setPayType(value)}
            options={[{ label: "Per Person", value: "PERSON" }, { label: "Total", value: "TOTAL" }]}
          />
        </div>

          <Button
            label="Next"
            onClick={() => {
              console.log("Next Page");
            }}
          theme="primary"
          />
        </form>
      )}
    </div>
  );
}