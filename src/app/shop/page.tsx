import { PRODUCTS } from "@/data/products";
import ShopCatalogView from "@/components/shop/ShopCatalogView";

export const metadata = {
  title: "Shop All Streetwear Drops & Heavyweight Tees — DEPLOY",
  description:
    "Explore original-design heavyweight apparel: 280–380 GSM combed cotton tees, mineral acid patinas, and oversized streetwear boxy silhouettes. Ready to wear, ready to deploy.",
};

export default function ShopPage() {
  return <ShopCatalogView initialProducts={PRODUCTS} />;
}
