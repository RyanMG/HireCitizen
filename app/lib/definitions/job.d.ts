import { TPerson, TPersonLanguage } from "./person";

export type TJobType = {
  id: number;
  name: "mining" | "cargo" | "construction" | "security" | "salvage" | "event" | "bountyHunting" | "rolePlay" | "repair" | "exploration";
  description: string;
};

export type TJobTypeCategory = {
  id: number;
  name: string;
  description?: string;
};

export type TJob = {
  id: string;
  owner: TPerson;
  title: string;
  description: string;
  jobType: TJobType;
  status?: 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
  createdAt?: string;
  updatedAt?: string;
  jobStart?: string;
  estimatedTime?: number;
  jobPrivacy?: string;
  jobReputationGate?: string;
  language?: TPersonLanguage;
  isBookmarked?: boolean;
  isFlagged?: boolean;
  crewRoles?: TCrewRole[];
}

export type TCrewRole = {
  id: number;
  name: string;
  description: string;
  requestedCount: number;
  filledCount: number;
}

export type TCrewRoleOption = {
  label: string;
  value: string;
}

export type TJobApplicant = {
  id: number;
  jobId: string;
  job?: TJob;
  person: TPerson;
  crewRole: TCrewRole;
  acceptedStatus: string;
}

export type TJobTypeCrewRoleJoin = {
  id: number;
  job_type_id: number;
  crew_role_id: number;
}
