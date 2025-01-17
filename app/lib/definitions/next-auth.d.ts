import { Person } from '@/app/lib/definitions/person';

declare module 'next-auth' {
  interface Session {
    activeUser: Person | null;
  }
}
