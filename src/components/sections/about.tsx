import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoSlider } from "@/components/ui/photo-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamDots } from "@/components/ui/team-dots";
import { team, type TeamMember } from "@/data/team";

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article
      tabIndex={0}
      className="group relative flex h-[460px] flex-col justify-end overflow-hidden rounded-[3px] bg-sand shadow-card transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 has-focus-visible:-translate-y-0.5 focus:outline-none"
    >
      {/* Fills the area above the collapsed text sheet so the photo's centre (the eyes) stays visible */}
      <div className="absolute inset-x-0 top-0 bottom-24 overflow-hidden bg-sand">
        <PhotoSlider
          photos={member.photos}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          controlsClassName="bottom-28"
        />
      </div>

      {/* Floating text sheet at bottom: moves up on hover */}
      <div className="relative z-10 flex flex-col justify-between bg-sand p-5 shadow-[0_-4px_16px_rgba(53,30,28,0.04)] transition-transform duration-300 ease-out">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-[19px] font-bold tracking-name text-espresso">{member.name}</h3>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex transition-transform hover:scale-105"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <Badge variant="link">
                <Asset name="icon-linkedin" width={10} height={10} />
                LinkedIn
              </Badge>
            </a>
          </div>
          <p
            className={`font-body text-badge font-semibold tracking-badge-caps uppercase ${
              member.disciplineTone === "coral" ? "text-coral" : "text-terracotta"
            }`}
          >
            {member.discipline}
          </p>

          {/* Body text expands on hover */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 group-has-focus-visible:grid-rows-[1fr] group-has-focus-visible:opacity-100">
            <div className="overflow-hidden">
              <p className="pt-2 font-body text-body-sm leading-[1.65] text-terracotta">{member.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="bg-gradient-aqua">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 xl:grid-cols-[380px_1fr] xl:gap-16 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">About us</Eyebrow>
          <SectionHeading>Based in Amsterdam. Working everywhere.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            We are engineers and researchers based in Amsterdam. No account managers, no layers, and no junior
            handoffs — you collaborate directly with the two people designing the system and writing the code.
          </p>
          <TeamDots>Amsterdam · Global</TeamDots>
        </div>
        {/* Right-aligned, equal-sized wider card grid */}
        <div className="grid w-full max-w-[660px] items-stretch gap-6 sm:grid-cols-2 lg:ml-auto">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
