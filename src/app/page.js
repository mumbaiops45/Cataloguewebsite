import Hero from "./components/home/Hero";
import Ribbon from "./components/home/Ribbon";
import Story from "./components/home/Story";
import Gallery from "./components/home/Gallery";
import Collections from "./components/home/Collections";
import Ishwari from "./components/home/Ishwari";
import IshwariShowcase from "./components/home/IshwariShowcase";
import Impact from "./components/home/Impact";
import Process from "./components/home/Process";
import Voices from "./components/home/Voices";
import Partners from "./components/home/Partners";
import Cta from "./components/home/Cta";
import FloatingActions from "./components/home/FloatingActions";

export default function Home() {
  return (
    <>
      <Hero />
      <Ribbon />
      <Story />
      <Gallery />
      <Collections />
      <Ishwari />
      <IshwariShowcase />
      <Impact />
      <Process />
      <Voices />
      <Partners />
      <Cta />
      <FloatingActions />
    </>
  );
}
