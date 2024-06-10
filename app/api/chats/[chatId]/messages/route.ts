// app/api/chats/[chatId]/messages/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import auth from "@/app/api/middleware/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }) {
  const response = auth(request);

  if (response.status !== 200) {
    return response;
  }

  const user = (request as any).user;
  const chatId = parseInt(params.chatId, 10);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' }
  });

  return NextResponse.json(messages);
}

export async function POST(request: NextRequest, { params }) {
  const response = auth(request);

  if (response.status !== 200) {
    return response;
  }

  const user = (request as any).user;
  const chatId = parseInt(params.chatId, 10);
  const { question, answer } = await request.json();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.create({
    data: {
      question,
      answer,
      chatId,
    },
  });

  return NextResponse.json(message);
}
