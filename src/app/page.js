import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Collections from "./components/home/Collections";
import MidBanner from "./components/home/MidBanner";
import Impact from "./components/home/Impact";
import FloatingActions from "./components/home/FloatingActions";
import { getCategoryList } from "./utils/catalog";

export default async function Home() {
  const categories = await getCategoryList().catch(() => []);

  return (
    <div className="homePage">
      <Hero />
      <Intro />
      <FeaturedProducts />
      <Collections categories={categories} />
      <MidBanner />
      <Impact />
      <FloatingActions />
    </div >
  );
}
