import NextAuth, { User } from 'next-auth';
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"

import { createNewPerson } from '@query/person/actions';
import { getPersonByEmail } from '@query/person/data';
import { Person } from '@definitions/person';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    error: "/(auth)/login/error",
    newUser: '/(auth)/login/new-user'
  },
  providers: [
    Google,
    Discord
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // User will be passed on first sign in with provider
      if (user && trigger === "signIn") {
        try {
          let activeUser: Person | null = await getPersonByEmail(token.email as string);
          if (!activeUser) {
            // Create new user
            activeUser = await createNewPerson(user as User);
          }

          if (activeUser) {
            token.id = activeUser.id;
            token.language_code = activeUser.language.code;
            return token;
          }

          // If we don't have an active user, we can't continue
          return null;

        } catch (error) {
          console.error('Error fetching active user:', error);
          return null;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session
    },
  }
});
