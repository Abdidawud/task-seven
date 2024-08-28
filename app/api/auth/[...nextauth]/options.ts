// app/api/auth/[...nextauth]/options.ts
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { config } from '@/config';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const info = await res.json();
        const user = info.data;

        if (res.ok && user) {
          return {
            id: user._id,
            accessToken: user.token,
            refreshToken: user.refreshToken,
            name: user.name,
            email: user.email,
            role: user.role,
            profileComplete: user.profileComplete,
            message: user.message,
            success: user.success,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  secret: "futc7TkMFexGPoSq++DOnh7iY/DxvjHv9PIOl5JkQoY=",
};
