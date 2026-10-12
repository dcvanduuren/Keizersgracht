import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ProjectSection } from "@/components/sections/project-section";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="work" className="scroll-mt-[72px]">
          {projects.map(({ id, diagram, ...project }) => (
            <ProjectSection key={id} {...project}>
              {diagram}
            </ProjectSection>
          ))}
        </div>
        <HowWeWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
