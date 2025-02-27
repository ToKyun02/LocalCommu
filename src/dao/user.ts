import { db } from '@/lib/db';

export default class UserDao {
  static async postUser(name: string, email: string, password: string) {
    try {
      await db.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return { success: '회원가입이 완료되었습니다!' };
    } catch (error) {
      return { error };
    }
  }

  static async getUserById(id: string) {
    try {
      const user = await db.user.findUnique({ where: { id } });
      return user;
    } catch {
      return null;
    }
  }
  static async getUserByEmail(email: string) {
    try {
      const user = await db.user.findUnique({ where: { email } });
      return user;
    } catch {
      return null;
    }
  }
  static async updateEmailVerified(id: string) {
    try {
      await db.user.update({
        where: { id },
        data: { emailVerified: new Date() },
      });
    } catch (error) {
      return error;
    }
  }
}
