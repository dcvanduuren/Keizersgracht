import { Abs } from "@/components/ui/abs";
import { Asset } from "@/components/ui/asset";
import { Box, DownArrow, stepNote, stepTitle } from "./parts";
import { DiagramFrame } from "./diagram-frame";

const card = "rounded-[3px] bg-canvas shadow-card";

function DrawingsStep() {
  return (
    <>
      <Abs x={16} y={0} w={128} h={144} className={card} />
      <Abs x={39} y={23}>
        <Asset name="construction-elevation" width={82} height={78} />
      </Abs>
      <Abs x={95} y={56} w={10} h={10} className="rounded-[1px] bg-aqua" />
      <Abs x={0} y={168} w={160}>
        <p className={stepTitle}>Architectural drawings</p>
      </Abs>
    </>
  );
}

function RulesStep() {
  return (
    <>
      <Abs x={8} y={0} w={184} h={207} className="rounded-[3px] bg-canvas shadow-card" />
      <Abs x={24} y={22} w={152}>
        <p className="font-body text-caption leading-normal font-semibold text-center text-espresso">
          Your team’s knowledge
        </p>
      </Abs>
      <Abs x={24} y={52} w={152} className="border-t border-border-subtle/55" />
      <Abs x={24} y={72} w={152} h={36} className="rounded-[3px] bg-aqua" />
      <Abs x={24} y={81} w={152}>
        <p className="font-body text-body-lg leading-normal font-semibold text-center text-espresso">AI analysis</p>
      </Abs>
      <Abs x={24} y={145} w={152}>
        <p className="font-body text-label leading-tight text-center text-terracotta">Agreed boundaries</p>
      </Abs>
      <Abs x={0} y={228} w={200}>
        <p className={stepTitle}>Your workflow + AI</p>
      </Abs>
      <Abs x={0} y={258} w={200}>
        <p className={`${stepNote} text-terracotta`}>Complexity → pricing</p>
      </Abs>
    </>
  );
}

function PriceStep() {
  return (
    <>
      <Abs x={16} y={0} w={128} h={144} className={card} />
      <Abs x={32} y={28} w={96}>
        <p className="font-body text-h2 leading-[1.3] text-center text-espresso">€</p>
      </Abs>
      <Abs x={32} y={100} w={96} h={28} className="rounded-[3px] bg-coral" />
      <Abs x={32} y={105} w={96}>
        <p className="font-body text-label leading-normal font-semibold text-center text-espresso">Ready</p>
      </Abs>
      <Abs x={0} y={168} w={160}>
        <p className={stepTitle}>Project price</p>
      </Abs>
      <Abs x={0} y={195} w={160}>
        <p className={`${stepNote} text-terracotta`}>Almost immediately</p>
      </Abs>
    </>
  );
}

const title = (
  <p className={`${stepTitle}`}>Drawings in. Price out.</p>
);

export function PriceToolDiagram() {
  return (
    <DiagramFrame
      label="Architectural drawings go in, a calculated project price comes out"
      desktop={
        <Abs x={32} y={34} w={896} h={412}>
          <Abs x={0} y={0} w={896}>
            {title}
          </Abs>
          <Abs x={64} y={96} w={160} h={240}>
            <DrawingsStep />
          </Abs>
          <Abs x={251} y={162}>
            <Asset name="flow-connector-1" width={37} height={12} />
          </Abs>
          <Abs x={348} y={64} w={200} h={280}>
            <RulesStep />
          </Abs>
          <Abs x={591} y={162}>
            <Asset name="flow-connector-2" width={37} height={12} />
          </Abs>
          <Abs x={672} y={96} w={160} h={240}>
            <PriceStep />
          </Abs>
        </Abs>
      }
      mobile={
        <div className="flex flex-col items-center gap-2">
          {title}
          <Box w={160} h={226}>
            <DrawingsStep />
          </Box>
          <DownArrow />
          <Box w={200} h={282}>
            <RulesStep />
          </Box>
          <DownArrow />
          <Box w={160} h={218}>
            <PriceStep />
          </Box>
        </div>
      }
    />
  );
}
