import { useState } from "react";
import FormInput from "@/components/formInput";
import FormSelect from "@/components/formSelect";
import FormDatePicker from "@/components/formDatePicker";
import FormTimePicker from "@/components/formTimePicker";
import Button from "@/components/button";
import { Dayjs } from "dayjs";
import initialCap from "@/utils/initialCap";
import dayjs from "dayjs";
import { JobTypeCategory } from "@/types/Job";
import { FormData } from "@/types/Forms";

export default function CreateJobPage1({
  returnFormData,
  jobTypeCategories
}: {
  returnFormData: (formData: FormData) => void,
  jobTypeCategories: JobTypeCategory[] | undefined
}) {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [payout, setPayout] = useState<number|"">("");
  const [payType, setPayType] = useState<string>("");
  const [jobDate, setJobDate] = useState<Dayjs>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [timezone, setTimezone] = useState<string>("");
  const [jobPrivacy, setJobPrivacy] = useState<FormData["jobPrivacy"]>("PUBLIC");

  const buildJobCategoryOptions = () => {
    const options = jobTypeCategories?.map((category) => ({ label: initialCap(category.name), value: category.id.toString() })) || [];
    options.unshift({ label: "Select Job Type", value: "0" });
    return options
  }

  const buildTimezoneOptions = () => {
    const options = [{ label: "EST", value: "EST" }, { label: "CST", value: "CST" }, { label: "MST", value: "MST" }, { label: "PST", value: "PST" }];
    return options
  }

  const validateForm = () => {
    const formData:FormData = {
      jobTitle,
      jobDescription,
      jobType,
      payout,
      payType,
      jobDate,
      startTime,
      timezone,
      jobPrivacy
    };

    let isValid:boolean = false;

    if (formData.jobTitle !== "") {
      isValid = true;
    }
    if (formData.jobDescription !== "") {
      isValid = true;
    }
    if (formData.jobType !== "") {
      isValid = true;
    }
    if (formData.payout !== "") {
      isValid = true;
    }
    if (formData.payType !== "") {
      isValid = true;
    }

    if (formData.timezone !== "") {
      isValid = true;
    }

    if (isValid) {
      returnFormData(formData);
    }
  }

  return (
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

      <FormDatePicker
        label="Job Date"
        value={jobDate}
        onChangeInput={(value) => value && setJobDate(value)}
      />

      <div className="flex flex-row gap-4">
        <FormTimePicker
          label="Start Time"
          value={startTime}
          onChangeInput={(value) => value && setStartTime(value)}
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
          onChangeInput={(value) => {
            if (value == "") {
              setPayout("");
              return;
            }

            const newValue = Number(value);
            if (isNaN(newValue)) {
              setPayout("")
            }
            setPayout(newValue)
          }}
        />
        <FormSelect
          label=""
          formValue={payType}
          onChangeInput={(value) => setPayType(value)}
          options={[{ label: "Per Person", value: "PERSON" }, { label: "Total", value: "TOTAL" }]}
        />
      </div>

      <FormSelect
        label="Job Privacy"
        formValue={jobPrivacy}
        onChangeInput={(value) => setJobPrivacy(value as FormData["jobPrivacy"])}
        options={[{ label: "Public Listing", value: "PUBLIC" }, { label: "List job for friends only", value: "FRIENDS" }, { label: "List job for your Org only", value: "ORG" }]}
      />

      <Button
        label="Next"
        onClick={validateForm}
        theme="primary"
      />
    </form>
  );
}
