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
  id: number;
  owner: Person;
  title: string;
  description: string;
  jobType: JobType;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  jobStart?: string;
  estimatedTime?: string;
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
