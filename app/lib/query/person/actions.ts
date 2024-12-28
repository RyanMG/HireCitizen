import { Person } from "@definitions/person";
import { neon } from "@neondatabase/serverless";
import { User } from "next-auth";

import z from "zod";

// eslint-disable-next-line
const personSchema = z.object({
  id: z.number(),
  handle: z.string(),
  moniker: z.string(),
  email: z.string(),
  phone: z.string(),
  rsi_url: z.string(),
  timezone: z.number(),
  account_status: z.string(),
  profile_image: z.string(),
  language_id: z.number(),
  reputation: z.number(),
});

/**
 * Create a new person from auth sign in
 */
export const createNewPerson = async (user: User): Promise<Person | null> => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const person = await sql`
      INSERT INTO person (email, profile_image, language_id)
      VALUES (${user.email}, ${user.image}, 1)
      RETURNING *
    `;

    return person[0] as Person;
  } catch (error) {
    console.error('Error creating person:', error);
    return null;
  }
}
