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
    <article className="flex flex-col rounded-card border border-sand bg-canvas/85 p-3.5 shadow-sm transition-all duration-200 hover:border-border-subtle hover:bg-canvas hover:shadow-card">
      {/* Inset framed photo instead of full-bleed giant banner */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-border-hairline/60 bg-sand">
        <div
          className="absolute left-0 w-full"
          style={{ height: `${100 / heightShare}%`, top: `${(-offsetShare / heightShare) * 100}%` }}
        >
          <Image
            src={member.photo}
            alt={member.photoAlt}
            fill
            sizes="(min-width: 768px) 300px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-1 pt-3 pb-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-[18px] font-bold tracking-name text-espresso">{member.name}</h3>
          <Badge variant="link">
            <Asset name="icon-linkedin" width={10} height={10} />
            LinkedIn
          </Badge>
        </div>
        <p
          className={`font-body text-micro font-semibold uppercase tracking-wider ${
            member.disciplineTone === "coral" ? "text-coral" : "text-terracotta"
          }`}
        >
          {member.discipline}
        </p>
        <p className="font-body text-body-sm leading-[1.65] text-terracotta">{member.bio}</p>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="bg-gradient-about">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-[minmax(0,380px)_1fr] xl:gap-20 xl:px-16">
        <div className="flex flex-col gap-6">
          <Eyebrow tone="coral">About us</Eyebrow>
          <SectionHeading>Based in Amsterdam. Working everywhere.</SectionHeading>
          <p className="font-body text-body leading-body text-terracotta">
            We are engineers and researchers based in Amsterdam. No account managers, no layers, and no junior
            handoffs — you collaborate directly with the two people designing the system and writing the code.
          </p>
          <TeamDots>Amsterdam · Global</TeamDots>
        </div>
        <div className="grid max-w-[640px] items-start gap-5 sm:grid-cols-2">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
