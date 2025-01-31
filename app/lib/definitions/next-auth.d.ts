import { TPerson } from '@/app/lib/definitions/person';

declare module 'next-auth' {
  interface Session {
    activeUser: TPerson | null;
  }
}
