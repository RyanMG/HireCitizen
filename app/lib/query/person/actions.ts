'use server';

import { Person } from "@/app/lib/definitions/person";
import { neon } from "@neondatabase/serverless";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

import { deleteUserFromNotifications } from "@query/notifications/actions";

// eslint-disable-next-line
const PersonSchema = z.object({
  id: z.number(),
  handle: z.string({
    required_error: 'Handle is required'
  }),
  moniker: z.string({
    required_error: 'Moniker is required'
  }),
  email: z.string(),
  phone: z.string(),
  rsi_url: z.string().url({
    message: 'Invalid URL'
  }),
  timezone: z.coerce.number(),
  account_status: z.string(),
  profile_image: z.string(),
  language_id: z.coerce.number(),
  reputation: z.number(),
});

/**
 * Create a new person from auth sign in
 */
export const createNewPersonFromAuth = async (user: User): Promise<Person | null> => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const person = await sql`
      INSERT INTO person (handle, moniker, email, phone, rsi_url, timezone_id, account_status, employee_reputation, employer_reputation, profile_image, language_id)
      VALUES ('', '', ${user.email}, '', '', 1, 'PENDING', 0, 0, ${user.image}, 1)
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
  const personId = formData.get('id');

  const validatedFields = personSchema.safeParse({
    rsi_url: formData.get('rsi_url'),
    handle: formData.get('handle'),
    moniker: formData.get('moniker'),
    profile_image: formData.get('profile_image'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    timezone: formData.get('timezone'),
    language_id: formData.get('language_id')
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
      UPDATE person
      SET handle = ${validatedFields.data.handle},
      moniker = ${validatedFields.data.moniker},
      email = ${validatedFields.data.email},
      phone = ${validatedFields.data.phone},
      rsi_url = ${validatedFields.data.rsi_url},
      timezone_id = ${validatedFields.data.timezone},
      language_id = ${validatedFields.data.language_id},
      profile_image = ${validatedFields.data.profile_image},
      account_status = 'ACTIVE'
      WHERE id = ${personId}
    `;

  } catch (error) {
    console.error('Error updating person:', error);
    return {
      errors: {},
      message: 'Error updating person.'
    };
  }

  revalidatePath('/profile');
  redirect('/profile');
}

/**
 * Remove a person by email - used when signing out
 */
export const removePersonByEmail = async (email: string): Promise<{ error: string } | undefined> => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const person = await sql`DELETE FROM person WHERE email = ${email} RETURNING id`;
    /**
     * remove the user from redis for notifications
     */
    const removeUserResponse = await deleteUserFromNotifications(person[0].id);

    if ('error' in removeUserResponse || !removeUserResponse.userDeleted) {
      return {
        error: 'Error removing user from notifications'
      }
    }

  } catch (error) {
    return {
      error: `Error removing person: ${error}`
    }
  }
}
