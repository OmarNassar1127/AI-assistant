// app/api/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export default function auth(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as any).user = verified; // TypeScript workaround for custom properties
    return NextResponse.next(); // Proceed with the next middleware or the main handler
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}
