'use client'

import { useActionState } from "react";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { initialCap } from "@lib/utils/textUtils";
import { State, createNewJob } from "@/app/lib/actions/jobs/actions";
import { JobTypeCategory } from "@/app/lib/definitions/job";
import { Timezone } from "@/app/lib/definitions/misc";

export default function CreateJobForm(props: {
  jobTypeCategories: JobTypeCategory[];
  timeZones: Timezone[];
}) {

  const initialState: State = { message: null, errors: {}, prevState: {} };
  // @ts-ignore
  const [state, formAction] = useActionState(createNewJob, initialState);

  const buildJobCategoryOptions = () => {
    const options = props.jobTypeCategories?.map((category) => ( <MenuItem key={category.id} value={category.id.toString()}>{initialCap(category.name)}</MenuItem> )) || [];
    options.unshift(<MenuItem key="0" value="0">Select Job Type</MenuItem>);
    return options
  }

  const buildTimezoneOptions = () => {
    const options = props.timeZones?.map((zone) => ( <MenuItem key={zone.id} value={zone.id.toString()}>{initialCap(zone.name)}</MenuItem> )) || [];
    options.unshift(<MenuItem key="0" value="0">Select Job Type</MenuItem>);
    return options
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form action={formAction} aria-describedby="form-error" className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full">
        <TextField
          variant="outlined"
          label="Job Title"
          required={true}
        />

        <TextField
          select
          variant="outlined"
          label="Job Type"
        >
          {buildJobCategoryOptions()}
        </TextField>

        <TextField
          variant="outlined"
          label="Job Description"
          multiline={true}
          rows={4}
          required={true}
        />

        <DatePicker
          label="Job Date"
          value={dayjs()}
          className="border border-gray-800 hover:border-gray-800 rounded-lg"
        />

        <div className="flex flex-row gap-4">
          <TimePicker
            label="Start Time"
            value={dayjs()}
          />

          <TextField
            select
            variant="outlined"
            label="Timezone"
            className="flex-grow"
          >
            {buildTimezoneOptions()}
          </TextField>
        </div>

        <TextField
            variant="outlined"
            label="Estimated Time For Job"
            required={true}
          />

        <div className="flex flex-row gap-4">
          <TextField
            variant="outlined"
            label="Payout"
            required={true}
          />

          <TextField
            select
            variant="outlined"
            label="Payout Type"
            className="flex-grow"
          >
            <MenuItem key="SPLIT" value={"SPLIT"}>Split Revenue</MenuItem>
            <MenuItem key="PERSON" value={"PERSON"}>Per Person</MenuItem>
            <MenuItem key="TOTAL" value={"TOTAL"}>Total</MenuItem>
          </TextField>
        </div>

        <TextField
          select
          variant="outlined"
          label="Job Privacy"
        >
          <MenuItem key="PUBLIC" value={"PUBLIC"}>Public Listing</MenuItem>
          <MenuItem key="FRIENDS" value={"FRIENDS"}>List job for friends only</MenuItem>
          <MenuItem key="ORG" value={"ORG"}>List job for your Org only</MenuItem>
        </TextField>

        <div>
          <label className="flex flex-row items-center gap-1">
            <Checkbox />
            <p>Reputation Gate Job <span className="text-gray-500 text-sm italic">(Reputation 6+ only)</span></p>
          </label>
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
}
