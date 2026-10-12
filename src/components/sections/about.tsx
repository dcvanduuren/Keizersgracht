import Image from "next/image";
import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamDots } from "@/components/ui/team-dots";
import { team, type TeamMember } from "@/data/team";

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card-lg border border-border-subtle bg-canvas shadow-card transition-all duration-200 hover:shadow-lg">
      {/* Full-bleed square portrait photo at top, matching hero styling */}
      <div className="relative aspect-square w-full overflow-hidden border-b border-border-subtle bg-canvas">
        <Image
          src={member.photo}
          alt={member.photoAlt}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-[20px] font-bold tracking-name text-espresso">{member.name}</h3>
            <Badge variant="link">
              <Asset name="icon-linkedin" width={10} height={10} />
              LinkedIn
            </Badge>
          </div>
          <p
            className={`font-body text-badge font-semibold tracking-badge-caps uppercase ${
              member.disciplineTone === "coral" ? "text-coral" : "text-terracotta"
            }`}
          >
            {member.discipline}
          </p>
          <p className="font-body text-body-sm leading-[1.65] text-terracotta">{member.bio}</p>
        </div>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="bg-gradient-about">
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
        {/* Right-aligned, equal-sized card grid */}
        <div className="grid w-full max-w-[660px] items-stretch gap-6 sm:grid-cols-2 lg:ml-auto">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
