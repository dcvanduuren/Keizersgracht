import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";
import { ProjectSection } from "./project-section";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-[72px] bg-canvas">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-16 md:gap-14 md:px-10 md:py-24 xl:px-16">
        <header className="flex max-w-[640px] flex-col gap-6">
          <Eyebrow tone="coral">Case studies</Eyebrow>
          <SectionHeading id="work-heading">What we&rsquo;re most proud of.</SectionHeading>
        </header>
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map(({ id, diagram, ...project }) => (
            <ProjectSection key={id} {...project}>
              {diagram}
            </ProjectSection>
          ))}
        </div>
      </div>
    </section>
  );
}
