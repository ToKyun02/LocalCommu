import { db } from '@/lib/db';

export default class UserDao {
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
}
