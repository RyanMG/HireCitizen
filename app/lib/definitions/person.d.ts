import { Timezone } from "./misc";

export type Person = {
  id: string;
  handle: string;
  moniker: string;
  email: string;
  phone: string;
  rsi_url: string;
  timezone: Timezone;
  account_status: string;
  profile_image: string;
  language: PersonLanguage;
  employee_reputation?: Reputation;
  employer_reputation?: Reputation;
};

export type PersonLanguage = {
  code: string;
  name: string;
  id: number;
}

export type Reputation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
