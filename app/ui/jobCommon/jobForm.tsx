'use client'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import { CreateJobFormState, createNewJob } from "@query/job/actions";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useActionState } from "react";
import FormWithErrorBlock from "../components/formWIthErrorBlock";
import { JobTypeCategory } from "@/app/lib/definitions/job";
import { initialCap } from "@/app/lib/utils/textUtils";

export default function JobForm(props: {
  jobTypeCategories: JobTypeCategory[],
  initialState: CreateJobFormState,
  jobStartDate: string
}) {

  const [state, formAction] = useActionState(createNewJob, props.initialState);

  const {
    prevState,
  } = state;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        action={formAction}
        aria-describedby="form-error"
        className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full overflow-auto"
      >

        <FormWithErrorBlock error={state.errors?.jobTitle || []}>
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

        <FormWithErrorBlock error={state.errors?.jobType || []}>
          <TextField
            id="jobType"
            name="jobType"
            select
            variant="filled"
            size="small"
            label="Job Type"
            key={prevState?.jobType || ""}
            defaultValue={prevState?.jobType || ""}
          >
            {props.jobTypeCategories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <MenuItem key={category.id.toString()} value={category.id.toString()}>
                  {initialCap(category.name)}
                </MenuItem>
              ))}
          </TextField>
        </FormWithErrorBlock>

        <FormWithErrorBlock error={state.errors?.jobDescription || []}>
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
          <FormWithErrorBlock halfWidth error={state.errors?.jobDate || []}>
            <DateTimePicker
              label="Start Time"
              defaultValue={dayjs(props.jobStartDate)}
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

          <FormWithErrorBlock halfWidth error={state.errors?.jobEstimatedTime || []}>
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

        <FormWithErrorBlock error={state.errors?.jobPrivacy || []}>
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

        <Button
          variant="contained"
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
        {'saveResponse' in state && <p className="text-red-500">{state.saveResponse}</p>}
      </form>
    </LocalizationProvider>
  );
}