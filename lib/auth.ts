import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yournextstadium.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) return false;
  
  // In production, you'd hash the password and store it securely
  // For now, we'll do a simple comparison
  return password === ADMIN_PASSWORD;
}

export function generateAdminToken(email: string): string {
  console.log('Generating token with secret:', JWT_SECRET);
  const token = jwt.sign(
    { email, role: 'admin', exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) },
    JWT_SECRET
  );
  console.log('Generated token:', token.substring(0, 20) + '...');
  return token;
}

// For API routes (Node.js environment)
export function verifyAdminToken(token: string): { email: string; role: string } | null {
  try {
    // console.log('Verifying token with secret:', JWT_SECRET);
    // console.log('Token to verify:', token.substring(0, 20) + '...');
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // console.log('Token verified successfully:', decoded);
    return { email: decoded.email, role: decoded.role };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// For middleware (Edge Runtime) - using Web Crypto API
export async function verifyAdminTokenEdge(token: string): Promise<{ email: string; role: string } | null> {
  try {
    // console.log('Verifying token in Edge Runtime with secret:', JWT_SECRET);
    // console.log('Token to verify:', token.substring(0, 20) + '...');
    
    // Simple token validation for Edge Runtime
    // In a real app, you'd use a proper JWT library that supports Edge Runtime
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
    
    // For now, let's do a simple check - in production you'd want proper JWT verification
    // This is a temporary solution until we implement proper Edge-compatible JWT verification
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.error('Token expired');
      return null;
    }
    
    // console.log('Token verified successfully in Edge Runtime:', payload);
    return { email: payload.email, role: payload.role };
  } catch (error) {
    console.error('Token verification failed in Edge Runtime:', error);
    return null;
  }
}