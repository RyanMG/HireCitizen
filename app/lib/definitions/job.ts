import { Person, PersonLanguage } from "./person";

export type JobType = {
  id: number;
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
  status?: 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
  createdAt?: string;
  updatedAt?: string;
  jobStart?: string;
  estimatedTime?: number;
  jobPrivacy?: string;
  jobReputationGate?: string;
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

export type CrewRoleOption = {
  label: string;
  value: string;
}

export type JobApplicant = {
  id: number;
  jobId: string;
  job?: Job;
  person: Person;
  crewRole: CrewRole;
  acceptedStatus: string;
}

export type JobTypeCrewRoleJoin = {
  id: number;
  job_type_id: number;
  crew_role_id: number;
}