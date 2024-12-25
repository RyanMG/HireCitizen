// import { useState } from "react";
// import FormInput from "@/components/form-elements/formInput";
// import FormSelect from "@/components/form-elements/formSelect";
// import FormDatePicker from "@/components/form-elements/formDatePicker";
// import FormTimePicker from "@/components/form-elements/formTimePicker";
// import FormCheckbox from "@/components/form-elements/formCheckbox";
// import Button from "@/components/form-elements/button";

// import { Dayjs } from "dayjs";
// import initialCap from "@/utils/initialCap";
// import dayjs from "dayjs";
// import { JobTypeCategory } from "@/types/Job";
// import { FormData } from "@/types/Forms";

// export default function CreateJobPage1({
//   returnFormData,
//   jobTypeCategories
// }: {
//   returnFormData: (formData: FormData) => void,
//   jobTypeCategories: JobTypeCategory[] | undefined
// }) {
//   const [jobTitle, setJobTitle] = useState<string>("");
//   const [jobDescription, setJobDescription] = useState<string>("");
//   const [jobType, setJobType] = useState<string>("");
//   const [payout, setPayout] = useState<number|"">("");
//   const [payType, setPayType] = useState<string>("");
//   const [jobDate, setJobDate] = useState<Dayjs>(dayjs());
//   const [startTime, setStartTime] = useState<Dayjs>(dayjs());
//   const [estimatedTime, setEstimatedTime] = useState<number|"">("");
//   const [timezone, setTimezone] = useState<string>("");
//   const [jobPrivacy, setJobPrivacy] = useState<FormData["jobPrivacy"]>("PUBLIC");
//   const [reputationGate, setReputationGate] = useState<boolean>(false);

//   const buildJobCategoryOptions = () => {
//     const options = jobTypeCategories?.map((category) => ({ label: initialCap(category.name), value: category.id.toString() })) || [];
//     options.unshift({ label: "Select Job Type", value: "0" });
//     return options
//   }

//   const buildTimezoneOptions = () => {
//     const options = [{ label: "EST", value: "EST" }, { label: "CST", value: "CST" }, { label: "MST", value: "MST" }, { label: "PST", value: "PST" }];
//     return options
//   }

//   const validateForm = () => {
//     const formData:FormData = {
//       jobTitle,
//       jobDescription,
//       jobType,
//       payout,
//       payType,
//       jobDate,
//       startTime,
//       estimatedTime,
//       timezone,
//       jobPrivacy,
//       reputationGate: false
//     };

//     let isValid:boolean = true;

//     if (formData.jobTitle === "") {
//       isValid = false;
//     }
//     if (formData.jobDescription === "") {
//       isValid = false;
//     }
//     if (formData.jobType === "") {
//       isValid = false;
//     }

//     if (formData.payout === "" || typeof formData.payout === "number" && formData.payout < 0) {
//       isValid = false;
//     }

//     if (formData.payType === "") {
//       isValid = false;
//     }

//     if (formData.estimatedTime === "" || typeof formData.estimatedTime === "number" && formData.estimatedTime < 0) {
//       isValid = false;
//     }

//     if (formData.timezone === "") {
//       isValid = false;
//     }

//     if (isValid) {
//       returnFormData(formData);
//     }
//   }

//   return (
//     <form className="flex flex-col gap-4 bg-gray-300 p-4 rounded-lg mt-4 mb-4 h-full">
//       <FormInput
//         label="Job Title"
//         formValue={jobTitle}
//         onChangeInput={(value) => setJobTitle(value)}
//       />

//       <FormSelect
//         label="Job Type"
//         onChangeInput={(value) => setJobType(value)}
//         options={buildJobCategoryOptions()}
//       />

//       <FormInput
//         label="Job Description"
//         formValue={jobDescription}
//         onChangeInput={(value) => setJobDescription(value)}
//         textarea={true}
//       />

//       <FormDatePicker
//         label="Job Date"
//         value={jobDate}
//         onChangeInput={(value) => value && setJobDate(value)}
//       />

//       <div className="flex flex-row gap-4">
//         <FormTimePicker
//           label="Start Time"
//           value={startTime}
//           onChangeInput={(value) => value && setStartTime(value)}
//         />

//         <FormSelect
//           label=""
//           onChangeInput={(value) => setTimezone(value)}
//           options={buildTimezoneOptions()}
//         />
//       </div>

//       <FormInput
//           label="Estimated Time For Job"
//           type="number"
//           width="50"
//           formValue={estimatedTime}
//           onChangeInput={(value) => {
//             if (value == "") {
//               setEstimatedTime("");
//               return;
//             }

//             const newValue = Number(value);
//             if (isNaN(newValue)) {
//               setEstimatedTime(0)
//             }
//             setEstimatedTime(newValue)
//           }}
//         />

//       <div className="flex flex-row gap-4">
//         <FormInput
//           label="Payout"
//           type="number"
//           width="50"
//           formValue={payout}
//           onChangeInput={(value) => {
//             if (value == "") {
//               setPayout("");
//               return;
//             }

//             const newValue = Number(value);
//             if (isNaN(newValue)) {
//               setPayout("")
//             }
//             setPayout(newValue)
//           }}
//         />
//         <FormSelect
//           label=""
//           onChangeInput={(value) => setPayType(value)}
//           options={[{ label: "Per Person", value: "PERSON" }, { label: "Total", value: "TOTAL" }]}
//         />
//       </div>

//       <FormSelect
//         label="Job Privacy"
//         onChangeInput={(value) => setJobPrivacy(value as FormData["jobPrivacy"])}
//         options={[{ label: "Public Listing", value: "PUBLIC" }, { label: "List job for friends only", value: "FRIENDS" }, { label: "List job for your Org only", value: "ORG" }]}
//       />

//       <FormCheckbox
//         checked={reputationGate}
//         onChangeInput={(change, value) => setReputationGate(value)}
//       >
//         <label className="text-gray-700">Reputation Gate Job <span className="text-gray-500 text-sm italic">(Reputation 6+ only)</span></label>
//       </FormCheckbox>

//       <Button
//         label="Next"
//         onClick={validateForm}
//         theme="primary"
//       />
//     </form>
//   );
// }
