import { Person, PersonLanguage } from "./person";

export type JobType = {
  name: "mining" | "cargo" | "construction" | "security" | "salvage" | "event" | "bountyHunting" | "rolePlay" | "repair" | "exploration";
  description: string;
};

export type JobTypeCategory = {
  id: number;
  name: string;
  description?: string;
};

export type Job = {
  id: string;
  owner: Person;
  title: string;
  description: string;
  jobType: JobType;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  jobStart?: string;
  estimatedTime?: number;
  amountPaid?: number;
  payType?: string;
  language?: PersonLanguage;
  isBookmarked?: boolean;
  isFlagged?: boolean;
  crewRoles?: CrewRole[];
}

export type CrewRole = {
  id: number;
  name: string;
  description: string;
  count: number;
}

export type JobApplicant = {
  id: number;
  jobId: string;
  personId: string;
  crewRoleId: number;
  acceptedStatus: string;
}
