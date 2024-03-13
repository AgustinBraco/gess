import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/environment';
import sendEmail from './email.helper';

class UserHelper {

  public validateAndHashPassword(password: string): string {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!re.test(password)) {
      throw new Error('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    return hashPassword;
  }

  public checkPassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  public createJWT(id: string, role: string): string {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  public checkJWT(token: string): any {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  }

  public async sendActivateAccountEmail(from: string, email: string, username: string, subject: string, text: string, token: string): Promise<void> {
    try {
      const htmlBody = `<html><head></head><body>Codigo de activación: ${token}</body></html>`;

      const emailResponse = await sendEmail({
        from: from,
        to: email,
        subject: subject,
        text: text,
        html: htmlBody,
      });

      if (!emailResponse.result) {
        throw new Error("Error sending email.");
      }
    } catch (error) {
      throw error;
    }
  }

  public newActivationToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 6; i++) {
      const char = Math.floor(Math.random() * characters.length);
      token += characters.charAt(char);
    }
    return token;
  }

}

export default new UserHelper()