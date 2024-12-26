export type Person = {
  id: number;
  handle: string;
  moniker: string;
  email: string;
  phone: string;
  rsi_url: string;
  timezone: string;
  account_status: string;
  profile_image: string;
  language: PersonLanguage;
  reputation: number;
};

export type PersonLanguage = {
  code: string;
  name: string;
}
