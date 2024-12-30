import { neon } from "@neondatabase/serverless";
import { Person } from "@definitions/person";
import { parse } from 'node-html-parser';

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

type RsiUserDetails = {
  profileImage: string;
  handle: string;
  moniker: string;
}
/**
 * Takes the user's provided RSI user page and scrapes it for the user's profile image, handle, and moniker
 */
export const scrapeRSIDetails = async (rsi_url: string): Promise<RsiUserDetails | Promise<{error: string}> | null> => {
  const profileResponse: RsiUserDetails = {
    profileImage: "",
    handle: "",
    moniker: "",
  };

  const isValidFormat = rsi_url.match(/^https?:\/\/robertsspaceindustries\.com\/citizens\/[a-zA-Z0-9_-]+$/);
  if (!isValidFormat) {
    return {
      error: 'Invalid URL format'
    };
  }

  const handle = rsi_url.split('/').pop();

  const response = await fetch(`https://robertsspaceindustries.com/citizens/${handle}`);
  const data = await response.text();
  const dom = parse(data);

  // If an invalid name is entered, the page will not include a citizen ID
  const citizenId = dom.querySelector('p.citizen-record strong');
  if (!citizenId) {
    return {
      error: 'No matching account found'
    };
  }

  const profileImage = dom.querySelector('div.thumb img');
  const moniker = dom.querySelector('div.info .entry:first-child .value');

  profileResponse.handle = handle || '';
  profileResponse.moniker = moniker?.textContent || '';
  profileResponse.profileImage = profileImage?.attrs.src || '';

  return profileResponse;
}