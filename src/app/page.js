import Hero from "./components/home/Hero";
import Intro from "./components/home/Intro";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Collections from "./components/home/Collections";
import MidBanner from "./components/home/MidBanner";
import Impact from "./components/home/Impact";
import FloatingActions from "./components/home/FloatingActions";

export default function Home() {
  return (
    <div className="homePage">
      <Hero />
      <Intro />
      <FeaturedProducts />
      <Collections />
      <MidBanner />
      <Impact />
      <FloatingActions />
    </div >
  );
}
