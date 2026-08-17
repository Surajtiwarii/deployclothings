import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return NextResponse.json({
    success: true,
    product,
    relatedProducts: related,
  });
}
