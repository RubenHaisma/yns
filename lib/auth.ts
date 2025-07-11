import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yournextstadium.nl';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) return false;
  
  // In production, you'd hash the password and store it securely
  // For now, we'll do a simple comparison
  return password === ADMIN_PASSWORD;
}

export function generateAdminToken(email: string): string {
  return jwt.sign(
    { email, role: 'admin', exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) },
    JWT_SECRET
  );
}

export function verifyAdminToken(token: string): { email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return { email: decoded.email, role: decoded.role };
  } catch (error) {
    return null;
  }
}