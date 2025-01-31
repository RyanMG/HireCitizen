import { TPerson } from "./person";

export type TJobMessage = {
  id: string;
  jobId: string;
  sender: TPerson;
  content: string;
  createdAt: string;
}