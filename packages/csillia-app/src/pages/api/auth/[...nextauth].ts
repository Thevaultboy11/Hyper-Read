import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const Options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 60 * 60 * 24,

    encode: async ({ secret, token }) => {
      if (!token) {
        throw new Error("Token is undefined.");
      }

      const encodedToken = await jwt.sign(token, secret, {
        algorithm: "HS256",
      });

      return encodedToken;
    },

    //@ts-ignore
    decode: async ({ token, secret }) => {
      if (!token) {
        throw new Error("Token is undefined.");
      }
      const verify = await jwt.verify(token, secret);
      return verify;
    },
  },
  pages: {
    signIn: "/home",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials || {};
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACK_END_PATH}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
              }), // fix the password value
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            //    throw new Error("Invalid crecookiesdentials");
          }
          const user = await res.json();

          if (user) {
            return {
              id: user.user.id,
              email: user.user.email,
              name: `${user.user.firstName} ${user.user.lastName}`,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(Options);
