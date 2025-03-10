import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

export function generateSalt() {
  return bcrypt.genSalt(SALT_ROUNDS);
}