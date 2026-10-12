import Image from "next/image";
import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamDots } from "@/components/ui/team-dots";
import { team, type TeamMember } from "@/data/team";

function TeamCard({ member }: { member: TeamMember }) {
  const { heightShare, offsetShare } = member.crop;
  return (
    <article className="flex flex-col overflow-hidden rounded-card-lg border border-border-subtle bg-canvas shadow-card">
      {/* Reproduces the Figma crop (stretch + crop transform) at the original 435:360 ratio. */}
      <div className="relative aspect-[435/360] w-full overflow-hidden border-b border-border-subtle">
        <div
          className="absolute left-0 w-full"
          style={{ height: `${100 / heightShare}%`, top: `${(-offsetShare / heightShare) * 100}%` }}
        >
          <Image
            src={member.photo}
            alt={member.photoAlt}
            fill
            sizes="(min-width: 768px) 436px, 100vw"
            className="object-fill"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-h3 font-bold tracking-name text-espresso">{member.name}</h3>
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
        <p className="font-body text-body-sm leading-[1.7] text-terracotta">{member.bio}</p>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="bg-gradient-about">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 xl:grid-cols-[352px_1fr] xl:gap-16 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">About us</Eyebrow>
          <SectionHeading>Based in Amsterdam. Working everywhere.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            We are engineers and researchers based in Amsterdam. No account managers, no layers, and no junior
            handoffs — you collaborate directly with the two people designing the system and writing the code.
          </p>
          <TeamDots>Amsterdam · Global</TeamDots>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
