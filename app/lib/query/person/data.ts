'use server';

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
      l.code as language_code, l.name as language_name, l.id as language_id,
      tz.name as timezone_name, tz.utc_offset as timezone_offset
      FROM person p
      LEFT JOIN language l ON p.language_id = l.id
      LEFT JOIN time_zones tz on p.timezone_id = tz.id
      WHERE p.email=${email};
    `

    if (personQuery.length === 0) {
      return null;
    }

    const {language_code, language_name, language_id, timezone_offset, timezone_name, timezone_id, ...rest } = personQuery[0];
    return {
      ...rest,
      language: {
        code: language_code,
        name: language_name,
        id: language_id
      },
      timezone: {
        utc_offset: timezone_offset,
        name: timezone_name,
        id: timezone_id
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

  const isValidFormat = rsi_url.match(/^https:\/\/robertsspaceindustries\.com\/citizens\/[a-zA-Z0-9_-]{3,16}$/);
  if (!isValidFormat) {
    return {
      error: 'Invalid URL format'
    };
  }

  const handle = rsi_url.split('/').pop();

  const response = await fetch(`https://robertsspaceindustries.com/citizens/${handle}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  });
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
  // URL can be all lower case. The version from the HTML will be as the user entered it
  const handle_proper = dom.querySelector('div.info .entry:nth-child(2) .value');

  // @TODO - scrape out ORG details

  profileResponse.handle = handle_proper?.textContent || handle || '';
  profileResponse.moniker = moniker?.textContent || '';
  profileResponse.profileImage = `https://robertsspaceindustries.com/${profileImage?.attrs.src}` || '';

  return profileResponse;
}