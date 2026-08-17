import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");
  const minGsm = searchParams.get("minGsm");
  const isNew = searchParams.get("new");
  const isBestseller = searchParams.get("bestseller");

  let filtered = [...PRODUCTS];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (minGsm) {
    filtered = filtered.filter((p) => p.gsm >= Number(minGsm));
  }

  if (isNew === "true") {
    filtered = filtered.filter((p) => p.isNewDrop);
  }

  if (isBestseller === "true") {
    filtered = filtered.filter((p) => p.isBestseller);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered,
  });
}
