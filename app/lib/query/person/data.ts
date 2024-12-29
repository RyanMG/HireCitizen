import { neon } from "@neondatabase/serverless";
import { Person } from "@definitions/person";

/**
 * Get a person by email - used in authentication as providers return a common email
 */
export const getPersonByEmail = async (email: string): Promise<Person | null> => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const personQuery = await sql`
      SELECT p.*,
      l.code as language_code, l.name as language_name
      FROM person p
      LEFT JOIN language l ON p.language_id = l.id
      WHERE p.email=${email};
    `

    if (personQuery.length === 0) {
      return null;
    }

    const {language_code, language_name, ...rest } = personQuery[0];
    return {
      ...rest,
      language: {
        code: language_code,
        name: language_name
      }
    } as Person;

  } catch (error) {
    console.error('Error fetching person by email:', error);
    return null;
  }
}
