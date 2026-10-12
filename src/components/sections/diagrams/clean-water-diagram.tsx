import { Abs } from "@/components/ui/abs";
import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { DownArrow, stepNote, stepTitle } from "./parts";
import { DiagramFrame } from "./diagram-frame";

function VialCard({ icon, label, className }: { icon: string; label: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-[3px] bg-canvas p-3", className)}>
      <div className="flex h-16 items-center justify-center rounded-[2px] bg-sand">
        <Asset name={icon} width={28} height={28} />
      </div>
      <p className="font-body text-label leading-tight font-semibold text-center text-espresso">{label}</p>
    </div>
  );
}

function AppInterface({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-[3px] bg-canvas p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="font-body text-caption font-semibold text-terracotta">Safe Water Gardens app</p>
        <div className="flex items-center gap-1.5">
          <Asset name="icon-wifi" width={14} height={14} />
          <Asset name="icon-battery" width={14} height={14} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-body text-[18px] font-semibold text-espresso">Sanitation impact</p>
          <p className="font-body text-caption leading-tight text-terracotta">Measuring village progress</p>
        </div>
        <Badge variant="chipAqua">
          <Asset name="icon-star" width={14} height={14} />
          Survey
        </Badge>
      </div>
      <div className="flex h-20 flex-col gap-2.5 rounded-[3px] bg-sand p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-label leading-tight text-terracotta">Sanitation score</p>
            <p className="font-body text-body-lg font-semibold text-espresso">Log improvements</p>
          </div>
          <Badge variant="chipCanvas">
            <Asset name="icon-star" width={14} height={14} />
            Record
          </Badge>
        </div>
      </div>
    </div>
  );
}

const caption = <p className={stepTitle}>Measuring sanitation impact over time</p>;
const subcaption = (
  <p className={`${stepNote} text-espresso`}>
    Surveying households with Safe Water Gardens to track how village sanitation and health improve.
  </p>
);

export function CleanWaterDiagram() {
  return (
    <DiagramFrame
      label="Households with Safe Water Gardens are surveyed to track long-term sanitation improvements"
      desktop={
        <Abs x={64} y={48} w={832} h={384}>
          <Abs x={30} y={76} w={112} h={132}>
            <VialCard icon="icon-droplet" label="Household survey" className="h-full w-full" />
          </Abs>
          <Abs x={148} y={135}>
            <Asset name="app-connection-1" width={26} height={14} />
          </Abs>
          <Abs x={180} y={72} w={472} h={210}>
            <AppInterface className="h-full w-full" />
          </Abs>
          <Abs x={658} y={223}>
            <Asset name="app-connection-2" width={26} height={14} />
          </Abs>
          <Abs x={690} y={164} w={112} h={132}>
            <VialCard icon="icon-users" label="Long-term impact" className="h-full w-full" />
          </Abs>
          <Abs x={180} y={319} w={472}>
            {caption}
          </Abs>
          <Abs x={180} y={350} w={472}>
            {subcaption}
          </Abs>
        </Abs>
      }
      mobile={
        <div className="flex flex-col items-center gap-2">
          <VialCard icon="icon-droplet" label="Household survey" className="h-[132px] w-[112px]" />
          <DownArrow />
          <AppInterface className="w-full max-w-[472px]" />
          <DownArrow />
          <VialCard icon="icon-users" label="Long-term impact" className="h-[132px] w-[112px]" />
          <div className="mt-6 flex flex-col gap-1">
            {caption}
            {subcaption}
          </div>
        </div>
      }
    />
  );
}
