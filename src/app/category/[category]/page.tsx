import { notFound } from "next/navigation";
import { PRODUCTS, CATEGORIES_CONFIG } from "@/data/products";
import { ProductCategory } from "@/types";
import ShopCatalogView from "@/components/shop/ShopCatalogView";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const config = CATEGORIES_CONFIG.find((c) => c.id === resolvedParams.category);
  if (!config) return { title: "Category Not Found — DEPLOY" };

  return {
    title: `${config.name} — DEPLOY Original Streetwear`,
    description: config.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const config = CATEGORIES_CONFIG.find((c) => c.id === resolvedParams.category);

  if (!config) {
    notFound();
  }

  return (
    <ShopCatalogView
      initialProducts={PRODUCTS}
      categoryFilter={config.id as ProductCategory}
      categoryTitle={config.name}
      categoryDescription={config.description}
    />
  );
}
