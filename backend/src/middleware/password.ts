import bcrypt from "bcrypt";

export class PasswordService {
  static async generatePassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(12);
      return bcrypt.hash(password, salt);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async comparePassword(password: string, hashedPassword: string) {
    try {
      const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
      if (!isCorrectPassword) throw new Error("Invalid password");
      return isCorrectPassword;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
