import NextAuth, { type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        //buscar usuario por correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!user) return null;
        //comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;
        //regresar el usuario
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
