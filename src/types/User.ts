export type User = {
  id: number;
  handle: string;
  moniker: string;
  email: string;
  phone: string;
  rsi_url: string;
  timezone: string;
  account_status: string;
  profile_image: string;
  language: UserLanguage;
  reputation: number;
};

export type UserLanguage = {
  code: string;
  name: string;
}
