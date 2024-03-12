import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/environment';
import sendEmail from './email.helper';

export function validateAndHashPassword(password: string): string {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!re.test(password)) {
    throw new Error('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
  }
  const hashPassword = bcrypt.hashSync(password, 7);
  return hashPassword;
}

export function checkPassword(password: string, hashPassword: string): boolean {
  return bcrypt.compareSync(password, hashPassword);
}

export function createJWT(id: string, role: string): string {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function checkJWT(token: string): any {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
}

export async function sendEmailToUser(from: string, email: string, username: string, subject: string, text: string, token: string): Promise<void> {
  const emailResponse = await sendEmail({
    from: from,
    to: email,
    subject: subject,
    text: text,
    html: `<html><head></head><body>
            <p>Hola ${username}, confirma tu cuenta en Gestores</p>
            <p>
              Tu cuenta ya esta casi lista, solo debes confirmarla
              en el siguiente enlace: <a href="backend_url/api/users/confirm/${token}">confirmar mi cuenta</a>
            </p>
            <p>Si no te has registrado en Gestores ignora el mensaje por favor.</p>
          </body></html>`,
  });
  if (!emailResponse.result) {
    throw new Error('Error sending email');
  }
}