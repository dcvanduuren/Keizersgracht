import { Abs } from "@/components/ui/abs";
import { Asset } from "@/components/ui/asset";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Bar, Box, DownArrow } from "./parts";
import { DiagramFrame } from "./diagram-frame";

const label = "font-body text-label font-semibold text-espresso";
const card = "flex flex-col rounded-card border border-sand shadow-card";

function IncomingRequests({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[120px] flex-col gap-2", className)}>
      <div className={cn(card, "gap-1.5 bg-canvas p-3")}>
        <Bar w={72} h={6} tone="espresso" />
        <Bar w={88} h={4} tone="subtle" />
        <Bar w={64} h={4} tone="subtle" />
      </div>
      <p className={label}>Incoming requests</p>
    </div>
  );
}

function AiAnalysis({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-24 flex-col gap-2", className)}>
      <div className={cn(card, "gap-1.5 bg-sand p-2.5")}>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 shrink-0 rounded-pill bg-coral" />
          <Bar w={56} h={4} tone="terracotta" />
        </div>
        <Bar w={76} h={4} tone="aqua" />
        <Bar w={68} h={4} tone="aqua" />
      </div>
      <p className={cn(label, "text-center")}>AI analysis</p>
    </div>
  );
}

function DraftReview({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[220px] flex-col gap-2", className)}>
      <div className="flex flex-col gap-3">
        <div className={cn(card, "gap-1.5 bg-canvas p-3")}>
          <Bar w={84} h={6} tone="espresso" />
          <Bar w={96} h={4} tone="subtle" />
          <Bar w={72} h={4} tone="subtle" />
          <Badge variant="solidCoral">Draft reply</Badge>
        </div>
        <Asset name="workflow-connector-3" width={24} height={24} />
        <div className={cn(card, "gap-2 bg-canvas px-5 py-4")}>
          <Bar w={180} h={6} tone="espresso" />
          <Bar w={180} h={4} tone="subtle" />
          <Bar w={144} h={4} tone="subtle" />
          <Badge variant="solidAqua">Ready for team</Badge>
        </div>
      </div>
      <p className={label}>Draft review</p>
    </div>
  );
}

export function AdminDraftsDiagram() {
  return (
    <DiagramFrame
      label="Incoming requests are analysed by AI, drafted as a reply and reviewed by the team"
      desktop={
        <div className="flex h-full w-full items-center justify-center">
          <Box w={548} h={241}>
            <Abs x={0} y={14}>
              <IncomingRequests />
            </Abs>
            <Abs x={136} y={27}>
              <Asset name="workflow-connector-1" width={24} height={24} />
            </Abs>
            <Abs x={176} y={15}>
              <AiAnalysis />
            </Abs>
            <Abs x={288} y={27}>
              <Asset name="workflow-connector-2" width={24} height={24} />
            </Abs>
            <Abs x={328} y={0}>
              <DraftReview />
            </Abs>
          </Box>
        </div>
      }
      mobile={
        <div className="flex flex-col items-center gap-2">
          <IncomingRequests />
          <DownArrow />
          <AiAnalysis />
          <DownArrow />
          <DraftReview />
        </div>
      }
    />
  );
}
