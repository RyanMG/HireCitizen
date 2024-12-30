'use server';

import { Person } from "@definitions/person";
import { neon } from "@neondatabase/serverless";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
export const createNewPersonFromAuth = async (user: User): Promise<Person | null> => {
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
    handle?: string[];
    moniker?: string[];
    profileImage?: string[];
    email?: string[];
    phone?: string[];
    timezone?: string[];
    language_id?: string[];
  };
  message?: string | null;
  userDetails?: {
    rsi_url?: string;
    profileImage?: string;
    handle?: string;
    moniker?: string;
  };
};

export const updatePerson = async (state: GetUserRSIUrlFormState | Promise<{message:string}> | null, formData: FormData): Promise<GetUserRSIUrlFormState | null> => {
  const personSchema = PersonSchema.omit({ id: true, account_status: true, reputation: true });
  const validatedFields = personSchema.safeParse({
    rsi_url: formData.get('rsi_url'),
    profile_image: formData.get('profile_image'),
    handle: formData.get('handle'),
    moniker: formData.get('moniker'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    timezone: formData.get('timezone'),
    language_id: formData.get('language_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'URL is required'
    };
  }
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO person (handle, moniker, email, phone, rsi_url, timezone_id, account_status, reputation, profile_image, language_id)
      VALUES (${validatedFields.data.handle}, ${validatedFields.data.moniker}, ${validatedFields.data.email}, ${validatedFields.data.phone}, ${validatedFields.data.rsi_url}, ${validatedFields.data.timezone}, 'ACTIVE', 5, ${validatedFields.data.profile_image}, ${validatedFields.data.language_id})
    `;

    revalidatePath('/profile');
    redirect('/profile');

  } catch (error) {
    console.error('Error updating person:', error);
    return {
      errors: {},
      message: 'Error updating person.'
    };
  }
}
