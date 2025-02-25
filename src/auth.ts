import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import UserDao from '@/dao/user';
import { UserRole } from '@prisma/client';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  events: {
    async linkAccount({ user }) {
      UserDao.updateEmailVerified(user.id ?? '');
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (token.role && session.user)
        session.user.role = token.role as UserRole;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await UserDao.getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  ...authConfig,
});
