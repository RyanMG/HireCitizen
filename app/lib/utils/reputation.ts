'use server';

import { auth } from "@/auth";
import { TReputation } from "@definitions/person";

export default async function calculateEmployeeReputation(): Promise<TReputation | null> {
  const session = await auth();
  const user = session?.activeUser;

  if (!user) {
    return null;
  }
  // Logged in = 3
  // Linked RSI account +1
  // Valid RSI account via spectrum message?

  /**
   * WHen a job is completed, the owner should rate the applicant
   *  - No show lowers reputation
   *  - Show raises reputation
   *  - On time raises reputation
   *  - Late lowers reputation
   *  - Quality of work affects reputation
   *  - Red flag - pirating, stealing, player killing, etc.

   * WHen a job is completed, the applicants should rate the owner
   *  - Job was listed acccuratly
   *  - Owner paid as listed for the job
   *  - Owner was on time and prepared to run the job.
   *  - Red flag - owner was priating players, player killing, etc.
  */

  const reputation = user.employee_reputation;

  return reputation || null;
}
