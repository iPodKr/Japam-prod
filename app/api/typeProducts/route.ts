import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    const typeProducts = await prisma.typeProduct.findMany();
    return NextResponse.json(typeProducts);
}