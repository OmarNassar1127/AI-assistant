// app/api/chats/[chatId]/messages.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { chatId } = params;

  const messages = await prisma.message.findMany({
    where: { chatId: Number(chatId) },
  });

  return NextResponse.json(messages);
}
