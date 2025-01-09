'use client'

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import FormWithErrorBlock from "../components/formWIthErrorBlock";
import { JobTypeCategory } from "@/app/lib/definitions/job";
import { initialCap } from "@/app/lib/utils/textUtils";
import { CreateJobFormState } from "@query/job/actions";

interface JobFormProps {
  jobTypeCategories: JobTypeCategory[],
  formState: CreateJobFormState,
  jobStartDate: string,
  onChangeJobType: (value: number) => void
}

export default function JobForm({
  jobTypeCategories,
  formState,
  jobStartDate,
  onChangeJobType
}: JobFormProps) {

  const {
    prevState,
    errors
  } = formState;

  return (
    <>
      <FormWithErrorBlock error={errors?.jobTitle || []}>
        <TextField
          name="jobTitle"
          id="jobTitle"
          size="small"
          label="Job Title"
          variant="filled"
          defaultValue={prevState?.jobTitle}
          aria-describedby="job-title-error"
        />
      </FormWithErrorBlock>

      <FormWithErrorBlock error={errors?.jobType || []}>
        <TextField
          id="jobType"
          name="jobType"
          select
          variant="filled"
          size="small"
          label="Job Type"
          key={prevState?.jobType || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeJobType(Number(e.target.value));
          }}
          defaultValue={prevState?.jobType || ""}
        >
          {jobTypeCategories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <MenuItem key={category.id.toString()} value={category.id.toString()}>
                {initialCap(category.name)}
              </MenuItem>
            ))}
        </TextField>
      </FormWithErrorBlock>

      <FormWithErrorBlock error={errors?.jobDescription || []}>
        <TextField
          id="jobDescription"
          name="jobDescription"
          size="small"
          label="Job Description"
          variant="filled"
          multiline
          rows={3}
          defaultValue={prevState?.jobDescription ||  ""}
        />
      </FormWithErrorBlock>

      <div className="flex flex-row gap-4">
        <FormWithErrorBlock halfWidth error={errors?.jobDate || []}>
          <DateTimePicker
            label="Start Time"
            defaultValue={dayjs(jobStartDate)}
            slotProps={{
              textField: {
                id: "jobDate",
                name: "jobDate",
                variant: 'filled',
                size: 'small'
              }
            }}
          />
        </FormWithErrorBlock>

        <FormWithErrorBlock halfWidth error={errors?.jobEstimatedTime || []}>
          <TextField
            select
            size="small"
            id="jobEstimatedTime"
            name="jobEstimatedTime"
            label="Estimated Time For Job"
            variant="filled"
            key={prevState?.jobEstimatedTime || ""}
            defaultValue={prevState?.jobEstimatedTime || ""}
          >
            <MenuItem value="30">30 Minutes</MenuItem>
            <MenuItem value="60">1 Hour</MenuItem>
            <MenuItem value="90">1.5 Hours</MenuItem>
            <MenuItem value="120">2 Hours</MenuItem>
            <MenuItem value="150">2.5 Hours</MenuItem>
            <MenuItem value="180">3 Hours</MenuItem>
            <MenuItem value="210">3.5 Hours</MenuItem>
            <MenuItem value="240">4 Hours</MenuItem>
            <MenuItem value="270">4.5 Hours</MenuItem>
            <MenuItem value="300">5 Hours</MenuItem>
          </TextField>
        </FormWithErrorBlock>
      </div>

      <FormWithErrorBlock error={errors?.jobPrivacy || []}>
        <TextField
          size="small"
          id="jobPrivacy"
          name="jobPrivacy"
          select
          variant="filled"
          label="Job Privacy"
          defaultValue={prevState?.jobPrivacy ||  "PUBLIC"}
        >
          <MenuItem value="PUBLIC">Public</MenuItem>
          <MenuItem value="FRIENDS">Friends</MenuItem>
          <MenuItem value="ORG">Org</MenuItem>
        </TextField>
      </FormWithErrorBlock>

      <label className="flex flex-row items-center">
        <Checkbox id="jobReputationGate" name="jobReputationGate" defaultChecked={Boolean(prevState?.jobReputationGate)} />
        <div className="text-gray-700">Reputation Gate Job <span className="text-gray-500 text-sm italic">(Reputation 6+ only)</span></div>
      </label>
    </>
  );
}