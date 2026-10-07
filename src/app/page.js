import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Collections from "./components/home/Collections";
import MidBanner from "./components/home/MidBanner";
import Impact from "./components/home/Impact";
import InfoStrip from "./components/home/InfoStrip";
import { getBanners, getCategoryList } from "./utils/catalog.server";
import { splitBanners } from "./router/banner.router";

// Render per request so Featured products / categories reflect the live DB
// instead of being frozen at build time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, banners] = await Promise.all([
    getCategoryList().catch(() => []),
    getBanners().catch(() => []),
  ]);
  const { hero, middle } = splitBanners(banners);

  return (
    <div className="homePage">
      <Hero banners={hero} />
      <Intro />
      <FeaturedProducts />
      <Collections categories={categories} />
      <MidBanner banners={middle} />
      <InfoStrip />
      <Impact />
    </div >
  );
}
