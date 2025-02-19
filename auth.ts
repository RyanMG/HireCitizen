import NextAuth, { User } from 'next-auth';
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"

import { createNewPersonFromAuth } from '@query/person/actions';
import { getPersonByEmail } from '@query/person/data';
import { TPerson } from '@definitions/person';
import { addUserToNotifications } from '@query/notifications/actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Discord
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // User will be passed on first sign in with provider
      if (user && trigger === "signIn") {
        try {
          let activeUser: TPerson | null = await getPersonByEmail(token.email as string);
          if (!activeUser) {
            // Create new user
            activeUser = await createNewPersonFromAuth(user as User);
          }

          if (activeUser && activeUser.id) {
            token.id = activeUser.id;
            /**
             * Add the new user into redis for notifications
             */
            const addUserResponse = await addUserToNotifications(activeUser.id);
            if ('error' in addUserResponse) {
              console.error('Error add new person into redis notificaton list', addUserResponse.error);
            }

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

      if (!session.activeUser) {
        try {
          session.activeUser = await getPersonByEmail(token.email as string);

        } catch (error) {
          console.error('HANDLE ME! ERROR GETTING ACTIVE USER FOR SESSION', error);
        }
      }

      return session
    }
  }
});
