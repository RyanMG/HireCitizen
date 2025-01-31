import { TTimezone } from "./misc";

export type TPerson = {
  id: string;
  handle: string;
  moniker: string;
  email: string;
  phone: string;
  rsi_url: string;
  timezone: TTimezone;
  account_status: string;
  profile_image: string;
  language: TPersonLanguage;
  employee_reputation?: TReputation;
  employer_reputation?: TReputation;
};

export type TPersonLanguage = {
  code: string;
  name: string;
  id: number;
}

export type TReputation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
