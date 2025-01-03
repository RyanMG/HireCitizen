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
  reputation: number;
};

export type PersonLanguage = {
  code: string;
  name: string;
  id: number;
}
