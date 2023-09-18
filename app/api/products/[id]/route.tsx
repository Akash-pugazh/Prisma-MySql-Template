import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "../schema";
import { productType } from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Success", data: product },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const productFind = await prisma.product.findUnique({
    where: { id: +id },
  });
  if (!productFind) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  const body: productType = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }
  const product = await prisma.product.update({
    where: { id: +id },
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(
    { message: "Product Updated Successfully", data: product },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const productFind = await prisma.product.findUnique({
    where: { id: +id },
  });
  if (!productFind) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  const product = await prisma.product.delete({
    where: { id: +id },
  });
  return NextResponse.json(
    { message: "Product Deleted Successfully", data: product },
    { status: 200 }
  );
}
