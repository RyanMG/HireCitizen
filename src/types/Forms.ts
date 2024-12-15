import { Dayjs } from "dayjs"
import { CrewRole } from "./Job"

export type FormData = {
  jobTitle: string
  jobDescription: string
  jobType: string
  payout: number | ""
  payType: string
  jobDate: Dayjs
  startTime: Dayjs
  timezone: string
  jobPrivacy: "PUBLIC" | "FRIENDS" | "ORG"
  reputationGate: boolean
  crewRoles: CrewRole[]
}
