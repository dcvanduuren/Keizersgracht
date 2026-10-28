import { Footer } from "@/components/layout/footer";
import { IntroSplash } from "@/components/layout/intro-splash";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <HowWeWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
