import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGridSection from "@/components/home/ProductGridSection";
import BrandStorySection from "@/components/home/BrandStorySection";
import CommunityUGC from "@/components/home/CommunityUGC";
import InnerCircleVIP from "@/components/home/InnerCircleVIP";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <FeaturedCategories />
      <ProductGridSection />
      <BrandStorySection />
      <CommunityUGC />
      <InnerCircleVIP />
    </div>
  );
}
