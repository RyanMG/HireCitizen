'use client'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

import { FormOption } from "@definitions/misc";
import { CreateJobFormState, createNewJob } from "@query/job/actions";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useActionState, ReactNode } from "react";

const JobInputBlock = ({ error, children, halfWidth }: { error: string[], children: ReactNode, halfWidth?: boolean }): ReactNode => {
  return (
    <div className={`flex flex-col gap-1 ${halfWidth ? 'w-1/2' : ''}`}>
      {children}
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {error && error.map((error: string) => (
          <p className="text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function JobForm(props: {
  jobTypeCategories: FormOption[],
  timeZones: FormOption[]
}) {
  const initialState: CreateJobFormState = { message: null, errors: {}, prevState: {} };
  const [state, formAction] = useActionState(createNewJob, initialState);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form action={formAction} aria-describedby="form-error" className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full overflow-auto">

        <JobInputBlock error={state.errors?.jobTitle || []}>
          <TextField
            name="jobTitle"
            id="jobTitle"
            size="small"
            label="Job Title"
            variant="filled"
            aria-describedby="job-title-error"
          />
        </JobInputBlock>

        <JobInputBlock error={state.errors?.jobType || []}>
          <TextField
            id="jobType"
            name="jobType"
            select
            variant="filled"
            size="small"
            label="Job Type"
            defaultValue=""
          >
            {props.jobTypeCategories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </JobInputBlock>

        <JobInputBlock error={state.errors?.jobDescription || []}>
          <TextField
            id="jobDescription"
            name="jobDescription"
            size="small"
            label="Job Description"
            variant="filled"
            multiline
            rows={3}
          />
        </JobInputBlock>

        <div className="flex flex-row gap-4">
          <JobInputBlock halfWidth error={state.errors?.jobDate || []}>
            <DateTimePicker
              label="Start Time"
              referenceDate={dayjs()}
              slotProps={{
              textField: {
                id: "jobDate",
                name: "jobDate",
                variant: 'filled',
                size: 'small'
              }
            }}
          />
          </JobInputBlock>

          <JobInputBlock halfWidth error={state.errors?.jobTimezone || []}>
            <TextField
              id="jobTimezone"
              name="jobTimezone"
              size="small"
              select
              variant="filled"
              label="Timezone"
              defaultValue={props.timeZones.find(tz => tz.label === 'UTC')?.value}
            >
              {props.timeZones.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </JobInputBlock>

        </div>

        <JobInputBlock error={state.errors?.jobEstimatedTime || []}>
          <TextField
            select
            size="small"
            id="jobEstimatedTime"
            name="jobEstimatedTime"
            label="Estimated Time For Job"
            variant="filled"
            defaultValue=""
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
        </JobInputBlock>

        <div className="flex flex-row gap-4">
          <JobInputBlock halfWidth error={state.errors?.jobPayout || []}>
            <TextField
              size="small"
              id="jobPayout"
              name="jobPayout"
              label="Payout"
              variant="filled"
              type="number"
            />
          </JobInputBlock>

          <JobInputBlock halfWidth error={state.errors?.jobPayedVia || []}>
            <TextField
              id="jobPayedVia"
              name="jobPayedVia"
              size="small"
              select
              variant="filled"
              label="Payed Via"
              defaultValue=""
            >
              <MenuItem value="SPLIT">Split Revenue</MenuItem>
              <MenuItem value="PERSON">Per Person</MenuItem>
              <MenuItem value="TOTAL">Total</MenuItem>
            </TextField>
          </JobInputBlock>
        </div>

        <JobInputBlock error={state.errors?.jobPrivacy || []}>
          <TextField
            size="small"
            id="jobPrivacy"
            name="jobPrivacy"
            select
            variant="filled"
            label="Job Privacy"
            defaultValue="PUBLIC"
          >
            <MenuItem value="PUBLIC">Public</MenuItem>
            <MenuItem value="FRIENDS">Friends</MenuItem>
            <MenuItem value="ORG">Org</MenuItem>
          </TextField>
        </JobInputBlock>

        <label className="flex flex-row items-center">
          <Checkbox id="jobReputationGate" name="jobReputationGate" />
          <div className="text-gray-700">Reputation Gate Job <span className="text-gray-500 text-sm italic">(Reputation 6+ only)</span></div>
        </label>

        <Button
          variant="contained"
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
}