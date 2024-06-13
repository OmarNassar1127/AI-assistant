// app/api/chats/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import auth from '@/app/api/middleware/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const response = auth(request);

  if (response.status !== 200) {
    return response;
  }

  const user = (request as any).user;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await request.json();

  const chat = await prisma.chat.create({
    data: {
      name,
      userId: parseInt(user.userId, 10), // Ensure userId is an integer
    },
  });

  return NextResponse.json(chat);
}
