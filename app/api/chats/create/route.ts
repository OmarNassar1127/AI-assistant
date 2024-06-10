// app/api/chats/create/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!session.user || !session.user.id) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const { name } = await request.json();

  const chat = await prisma.chat.create({
    data: {
      name,
      userId: parseInt(session.user.id, 10), // Convert id to number if necessary
    },
  });

  return NextResponse.json(chat);
}
