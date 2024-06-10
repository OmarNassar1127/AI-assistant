// app/api/chats/list/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions });

  console.log("Session:", session); // Debug: Log the session object

  if (!session) {
    return NextResponse.json({ error: "hello nigga" }, { status: 401 });
  }

  const chats = await prisma.chat.findMany({
    where: { userId: parseInt(session.user.id, 10) }, // Ensure userId is an integer
    include: {
      messages: true,
    },
  });

  return NextResponse.json(chats);
}
