'use server';

import { Person } from "@definitions/person";
import { neon } from "@neondatabase/serverless";
import { User } from "next-auth";
import { parse } from 'node-html-parser';

import z from "zod";

// eslint-disable-next-line
const PersonSchema = z.object({
  id: z.number(),
  handle: z.string(),
  moniker: z.string(),
  email: z.string(),
  phone: z.string(),
  rsi_url: z.string().url({
    message: 'Invalid URL'
  }),
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
      INSERT INTO person (handle, moniker, email, phone, rsi_url, timezone_id, account_status, reputation, profile_image, language_id)
      VALUES ('', '', ${user.email}, '', '', 27, 'PENDING', 0, ${user.image}, 1)
      RETURNING *;
    `;

    const language = await sql`
      SELECT * FROM language WHERE id = ${person[0].language_id};
    `;

    return {
      ...person[0],
      language: {
        code: language[0].code,
        name: language[0].name
      }
    } as Person;

  } catch (error) {
    console.error('Error creating person:', error);
    return null;
  }
}

export type GetUserRSIUrlFormState = {
  errors?: {
    rsi_url?: string[];
  };
  message?: string | null;
  userDetails?: {
    rsi_url?: string;
    profileImage?: string;
    handle?: string;
    moniker?: string;
  };
};

export const getRSIUserDetails = async (state: GetUserRSIUrlFormState | Promise<{message:string}> | null, formData: FormData): Promise<GetUserRSIUrlFormState | null> => {
  const personSchema = PersonSchema.omit({ id: true, handle: true, moniker: true, email: true, phone: true, timezone: true, language_id: true, account_status: true, reputation: true, profile_image: true });
  const validatedFields = personSchema.safeParse({
    rsi_url: formData.get('rsi_url')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'URL is required'
    };
  }
  const profileResponse: GetUserRSIUrlFormState['userDetails'] = {
    profileImage: "",
    handle: "",
    moniker: "",
  };

  const handle = validatedFields.data.rsi_url.split('/').pop();
  const response = await fetch(`https://robertsspaceindustries.com/citizens/${handle}`);
  const data = await response.text();
  const dom = parse(data);
  const citizenId = dom.querySelector('p.citizen-record strong');
  if (!citizenId) {
    return {
      errors: {
        rsi_url: ['Invalid URL']
      },
      message: 'Invalid URL'
    };
  }

  const profileImage = dom.querySelector('div.thumb img');
  const moniker = dom.querySelector('div.info .entry:first-child .value');

  profileResponse.handle = handle;
  profileResponse.moniker = moniker?.textContent || '';
  profileResponse.profileImage = profileImage?.attrs.src || '';

  return {
    userDetails: profileResponse
  };
}