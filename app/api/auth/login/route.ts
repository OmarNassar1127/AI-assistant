import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!; // Ensure you have a secret key in your .env

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Find user
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
  }

  // Check if the user is verified
  if (!user.verified) {
    return NextResponse.json({ error: "User not verified" }, { status: 403 });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 400 });
  }

  // Generate token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return NextResponse.json({ token }, { status: 200 });
}
