import { Person } from '@definitions/person';

declare module 'next-auth' {
  interface Session {
    activeUser: Person | null;
  }
}
