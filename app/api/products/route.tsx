import { NextResponse, NextRequest } from "next/server";
import { productSchema } from "./schema";
import { productType } from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({});
  return NextResponse.json(
    { message: "Success", data: products },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body: productType = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(
    { message: "Product Created Successfully", data: product },
    { status: 201 }
  );
}
