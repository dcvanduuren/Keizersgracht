"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Bar, DownArrow, stepNote, stepTitle } from "./parts";
import { DiagramFrame } from "./diagram-frame";

/* ------------------------------------------------------------------ */
/* Act 1 — Entry: Compact Household Survey Card with Checklist        */
/* ------------------------------------------------------------------ */

function DropletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 3.5C14 3.5 6.5 11.4 6.5 16.6a7.5 7.5 0 0 0 15 0C21.5 11.4 14 3.5 14 3.5Z"
        stroke="#351E1C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10.5 17a3.5 3.5 0 0 0 3.5 3.5" stroke="#A0C9CB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckboxRow({
  color,
  barWidth,
  barTone,
}: {
  color: "aqua" | "espresso";
  barWidth: number;
  barTone: "espresso" | "sand";
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-[10px] w-[10px] shrink-0 items-center justify-center rounded-[2px]",
          color === "aqua" ? "bg-[#A0C9CB]" : "bg-[#351E1C]",
        )}
      >
        <svg width="6" height="5" viewBox="0 0 7 6" fill="none" aria-hidden>
          <path
            d="M1 3L2.8 4.8L6 1"
            stroke={color === "aqua" ? "#351E1C" : "#F5F4ED"}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={cn(
          "h-[3.5px] rounded-[1px]",
          barTone === "espresso" ? "bg-[#351E1C]" : "bg-[#ECECDC]",
        )}
        style={{ width: `${barWidth}px` }}
      />
    </div>
  );
}

function IntakeCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] p-3 shadow-card",
        className,
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-[#ECECDC]">
        <DropletIcon />
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="font-display text-[12.5px] leading-tight font-bold text-[#351E1C]">Household Survey</p>
        <p className="font-body text-[10px] leading-tight text-[#733635]">Door-to-door SWG check</p>
      </div>

      {/* Abstract 3-Item Survey Checklist */}
      <div className="flex flex-col gap-2 pt-0.5">
        <CheckboxRow color="aqua" barWidth={72} barTone="espresso" />
        <CheckboxRow color="espresso" barWidth={56} barTone="sand" />
        <CheckboxRow color="aqua" barWidth={44} barTone="espresso" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 2 — Masked Kampung Map with 4 Accumulating Households          */
/* ------------------------------------------------------------------ */

/** Tiny building footprints: [x, y, w, h, rotation°]. Preserved from Step 1. */
const BUILDINGS: [number, number, number, number, number][] = [
  [70, 64, 14, 10, -8],
  [92, 58, 10, 9, -8],
  [112, 74, 12, 9, 6],
  [150, 52, 13, 10, 4],
  [176, 66, 10, 8, 4],
  [208, 54, 12, 9, -6],
  [236, 74, 11, 9, -6],
  [58, 112, 12, 9, 10],
  [84, 124, 10, 10, 10],
  [128, 108, 14, 9, -4],
  [152, 128, 10, 9, -4],
  [200, 112, 13, 10, 8],
  [230, 124, 10, 9, 8],
  [262, 108, 12, 9, -3],
  [66, 196, 13, 10, -6],
  [92, 210, 10, 9, -6],
  [124, 188, 12, 9, 5],
  [156, 206, 14, 10, 5],
  [214, 196, 11, 9, -10],
  [240, 212, 12, 10, -10],
  [268, 190, 10, 9, 4],
  [84, 258, 13, 10, 7],
  [112, 272, 11, 9, 7],
  [148, 256, 12, 10, -5],
  [180, 274, 10, 9, -5],
  [232, 258, 13, 9, 3],
  [258, 272, 10, 9, 3],
];

/** Organic parcel outlines. Preserved from Step 1. */
const PARCELS = [
  "M56 52 Q80 44 128 50 L134 92 Q96 98 60 94 Z",
  "M144 46 Q190 40 252 50 L256 92 Q200 98 148 92 Z",
  "M48 104 Q76 100 118 102 L122 146 Q84 150 52 146 Z",
  "M126 100 Q172 98 216 104 L214 148 Q170 152 130 146 Z",
  "M224 100 Q252 98 286 104 L284 146 Q254 150 228 146 Z",
  "M52 184 Q90 178 136 184 L140 232 Q96 238 56 232 Z",
  "M148 182 Q196 180 232 186 L236 232 Q196 238 152 230 Z",
  "M244 180 Q268 178 290 184 L288 230 Q266 234 246 230 Z",
  "M70 246 Q110 240 160 246 L164 290 Q116 296 74 290 Z",
  "M172 244 Q216 242 270 248 L268 292 Q220 296 176 290 Z",
];

interface HouseholdNode {
  id: string;
  title: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  cardPos: { left: number; top: number };
}

const HOUSEHOLDS: HouseholdNode[] = [
  {
    id: "HOUSEHOLD 01",
    title: "Water Quality Check",
    x: 96,
    y: 118,
    cx: 104,
    cy: 126,
    cardPos: { left: 16, top: 152 },
  },
  {
    id: "HOUSEHOLD 02",
    title: "Garden Condition",
    x: 176,
    y: 164,
    cx: 184,
    cy: 172,
    cardPos: { left: 68, top: 24 },
  },
  {
    id: "HOUSEHOLD 03",
    title: "Sanitation & Odour",
    x: 236,
    y: 104,
    cx: 244,
    cy: 112,
    cardPos: { left: 108, top: 140 },
  },
  {
    id: "HOUSEHOLD 04",
    title: "System Maintenance",
    x: 216,
    y: 204,
    cx: 224,
    cy: 212,
    cardPos: { left: 44, top: 32 },
  },
];

/* ------------------------------------------------------------------ */
/* Abstract Visual Survey Outcomes (No Fake Metrics)                  */
/* ------------------------------------------------------------------ */

function WaterQualityBars() {
  const bars = [
    { height: 65, tone: "espresso" as const },
    { height: 85, tone: "aqua" as const },
    { height: 45, tone: "espresso" as const },
    { height: 92, tone: "aqua" as const },
  ];

  return (
    <div className="flex items-end justify-between gap-3 h-10 px-1 pt-1">
      {bars.map((bar, idx) => (
        <div key={idx} className="relative h-8 w-3 rounded-[1px] bg-[#ECECDC] flex items-end overflow-hidden">
          <div
            className={cn(
              "w-full rounded-[1px] transition-all duration-500",
              bar.tone === "aqua" ? "bg-[#A0C9CB]" : "bg-[#351E1C]",
            )}
            style={{ height: `${bar.height}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function SteppedSparkline() {
  return (
    <div className="flex flex-col gap-1 w-full px-1 pt-1">
      <svg width="150" height="34" viewBox="0 0 150 34" fill="none" className="overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="garden-spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A0C9CB" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A0C9CB" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d="M 0,26 L 30,26 L 30,20 L 72,20 L 72,13 L 112,13 L 112,6 L 150,6 L 150,34 L 0,34 Z"
          fill="url(#garden-spark-fill)"
        />
        <path
          d="M 0,26 L 30,26 L 30,20 L 72,20 L 72,13 L 112,13 L 112,6 L 150,6"
          stroke="#A0C9CB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="150" cy="6" r="2.5" fill="#351E1C" />
      </svg>
    </div>
  );
}

function SanitationBars() {
  const bars = [
    { height: 80, tone: "aqua" as const },
    { height: 55, tone: "espresso" as const },
    { height: 95, tone: "aqua" as const },
    { height: 70, tone: "espresso" as const },
  ];

  return (
    <div className="flex items-end justify-between gap-3 h-10 px-1 pt-1">
      {bars.map((bar, idx) => (
        <div key={idx} className="relative h-8 w-3 rounded-[1px] bg-[#ECECDC] flex items-end overflow-hidden">
          <div
            className={cn(
              "w-full rounded-[1px] transition-all duration-500",
              bar.tone === "aqua" ? "bg-[#A0C9CB]" : "bg-[#351E1C]",
            )}
            style={{ height: `${bar.height}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function MaintenanceProgressBars() {
  return (
    <div className="flex flex-col gap-2 w-full px-1 pt-2">
      <div className="h-2 w-full rounded-[1px] bg-[#ECECDC] overflow-hidden">
        <div className="h-full bg-[#A0C9CB] rounded-[1px]" style={{ width: "88%" }} />
      </div>
      <div className="h-2 w-full rounded-[1px] bg-[#ECECDC] overflow-hidden">
        <div className="h-full bg-[#351E1C] rounded-[1px]" style={{ width: "74%" }} />
      </div>
      <div className="h-2 w-full rounded-[1px] bg-[#ECECDC] overflow-hidden">
        <div className="h-full bg-[#A0C9CB] rounded-[1px]" style={{ width: "94%" }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inspection Floating Card                                           */
/* ------------------------------------------------------------------ */

function InspectionCard({ activeNode }: { activeNode: number }) {
  const household = HOUSEHOLDS[activeNode];

  return (
    <div
      className="pointer-events-none absolute z-20 w-[184px] rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] p-3 shadow-card transition-all duration-300 ease-out"
      style={{
        left: `${household.cardPos.left}px`,
        top: `${household.cardPos.top}px`,
      }}
    >
      <div className="flex flex-col gap-0.5 border-b border-[#ECECDC] pb-2">
        <span className="font-mono text-[10px] font-semibold tracking-wider text-[#733635] uppercase leading-none">
          {household.id}
        </span>
        <p className="font-display text-[12px] font-bold leading-tight text-[#351E1C]">
          {household.title}
        </p>
      </div>

      <div className="pt-2">
        {activeNode === 0 && <WaterQualityBars />}
        {activeNode === 1 && <SteppedSparkline />}
        {activeNode === 2 && <SanitationBars />}
        {activeNode === 3 && <MaintenanceProgressBars />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kampung SVG Map: 4 Households with Cumulative Highlights           */
/* ------------------------------------------------------------------ */

function KampungMap({
  activeNode,
  onSelectNode,
}: {
  activeNode: number;
  onSelectNode: (idx: number) => void;
}) {
  return (
    <svg viewBox="0 0 340 340" width="340" height="340" fill="none" aria-hidden="false">
      {/* Parcels */}
      {PARCELS.map((d) => (
        <path key={d} d={d} fill="#ECE8E1" fillOpacity="0.7" stroke="#C8C2B6" strokeWidth="1" />
      ))}

      {/* Aqua canal */}
      <path
        d="M-10 238 C60 226 110 176 170 168 S290 120 350 92"
        stroke="#A0C9CB"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M-10 238 C60 226 110 176 170 168 S290 120 350 92"
        stroke="#F5F4ED"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* Fine 1px Espresso streets */}
      <g stroke="#351E1C" strokeWidth="1" strokeLinecap="round">
        <path d="M0 100 Q120 96 340 102" />
        <path d="M0 150 Q130 156 340 148" />
        <path d="M0 238 Q140 232 340 240" />
        <path d="M0 296 Q140 300 340 294" />
        <path d="M140 0 Q136 120 142 340" />
        <path d="M222 0 Q226 160 220 340" />
        <path d="M44 0 Q50 160 42 340" />
        <path d="M296 0 Q292 160 298 340" />
      </g>

      {/* Building footprints */}
      <g fill="#733635" fillOpacity="0.18" stroke="#733635" strokeWidth="1">
        {BUILDINGS.map(([x, y, w, h, r]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} transform={`rotate(${r} ${x + w / 2} ${y + h / 2})`} />
        ))}
      </g>

      {/* Dashed Terracotta survey route linking the 4 households */}
      <polyline
        points="104,126 184,172 244,112 224,212"
        stroke="#733635"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinejoin="round"
      />

      {/* 4 Household Nodes with Cumulative State */}
      {HOUSEHOLDS.map((node, idx) => {
        const isSurveyed = idx <= activeNode;
        const isCurrent = idx === activeNode;

        return (
          <g
            key={node.id}
            className="cursor-pointer transition-transform duration-200"
            onClick={() => onSelectNode(idx)}
            role="button"
            tabIndex={0}
            aria-label={`${node.id} (${node.title}) - ${isCurrent ? "Currently active" : isSurveyed ? "Surveyed" : "Pending"}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectNode(idx);
              }
            }}
          >
            {/* Subtle Active Ping Ring on Current Household */}
            {isCurrent && (
              <rect
                x={node.x - 4}
                y={node.y - 4}
                width="24"
                height="24"
                rx="3"
                fill="none"
                stroke="#FF6037"
                strokeWidth="1.5"
                className="animate-ping opacity-60 pointer-events-none"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            )}

            {/* Chamfered square marker */}
            <rect
              x={node.x}
              y={node.y}
              width="16"
              height="16"
              rx="2"
              fill={isSurveyed ? "#FF6037" : "#ECECDC"}
              stroke={isSurveyed ? "#351E1C" : "#733635"}
              strokeWidth="1.5"
              className="transition-colors duration-300"
            />
          </g>
        );
      })}
    </svg>
  );
}

function MapOrb({
  activeNode,
  onSelectNode,
}: {
  activeNode: number;
  onSelectNode: (idx: number) => void;
}) {
  return (
    <div className="relative h-[340px] w-[340px] shrink-0">
      <div
        className="absolute inset-0 bg-[#F5F4ED]"
        style={{
          WebkitMaskImage: "radial-gradient(circle at center, #000 0%, #000 52%, transparent 70%)",
          maskImage: "radial-gradient(circle at center, #000 0%, #000 52%, transparent 70%)",
        }}
      >
        <KampungMap activeNode={activeNode} onSelectNode={onSelectNode} />
      </div>

      <InspectionCard activeNode={activeNode} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 — Spectators: Cleaned Up Cards with Readable Captions        */
/* ------------------------------------------------------------------ */

function SwgOperationsCard({
  activeNode,
  className,
}: {
  activeNode: number;
  className?: string;
}) {
  const TOTAL_BLOCKS = 8;
  const surveyedBlocks = activeNode + 1;

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] p-3 shadow-card transition-all duration-300",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 border-b border-[#ECECDC] pb-1">
        <p className="font-display text-[12.5px] leading-tight font-bold text-[#351E1C]">
          SWG Operations
        </p>
        <span className="font-body text-[10px] leading-tight text-[#733635]">
          Participating Households
        </span>
      </div>

      {/* Row of Household Blocks */}
      <div className="flex items-center gap-1.5 py-1">
        {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => {
          const isFilled = i < surveyedBlocks;
          const isLatest = i === activeNode;

          return (
            <div
              key={i}
              className={cn(
                "h-3.5 w-3.5 rounded-[2px] border transition-all duration-500",
                isFilled
                  ? "bg-[#FF6037] border-[#351E1C]"
                  : "bg-[#ECECDC] border-[#D4D4C4]",
                isLatest && "ring-1 ring-[#FF6037]/50",
              )}
            />
          );
        })}
      </div>

      {/* Clean Readable Caption */}
      <p className="font-body text-[10.5px] leading-[1.38] text-[#733635] pt-1.5 border-t border-[#ECECDC]/60">
        Tracking newly onboarded families and active garden installations.
      </p>
    </div>
  );
}

const VILLAGE_AVERAGE_HEIGHTS = [
  [52, 66, 72],
  [60, 74, 78],
  [68, 80, 84],
  [76, 86, 92],
];

function IndonesianGovCard({
  activeNode,
  className,
}: {
  activeNode: number;
  className?: string;
}) {
  const heights = VILLAGE_AVERAGE_HEIGHTS[activeNode];

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] p-3 shadow-card transition-all duration-300",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 border-b border-[#ECECDC] pb-1">
        <p className="font-display text-[12.5px] leading-tight font-bold text-[#351E1C]">
          Indonesian Ministry / Gov
        </p>
        <span className="font-body text-[10px] leading-tight text-[#733635]">
          Regional Water Quality
        </span>
      </div>

      {/* Abstract Village Average Graph */}
      <div className="flex items-end justify-between gap-3 h-7 px-2 py-0.5 bg-[#FAF9F5] rounded-[2px] border border-[#ECECDC]">
        {heights.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
            <div className="relative w-full h-5 rounded-[1px] bg-[#ECECDC] overflow-hidden flex items-end">
              <div
                className={cn(
                  "w-full rounded-[1px] transition-all duration-700 ease-out",
                  i % 2 === 0 ? "bg-[#A0C9CB]" : "bg-[#351E1C]",
                )}
                style={{ height: `${h}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Clean Readable Caption */}
      <p className="font-body text-[10.5px] leading-[1.38] text-[#733635] pt-1.5 border-t border-[#ECECDC]/60">
        Aggregated village data to monitor regional water quality and health impact.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const caption = <p className={stepTitle}>Mapping sanitation, household by household</p>;
const subcaption = (
  <p className={`${stepNote} text-[#351E1C]`}>
    Door-to-door Safe Water Gardens surveys feed a shared map of village progress.
  </p>
);

export function SwgSurveyDiagram() {
  const [activeNode, setActiveNode] = useState<number>(0);

  // Auto-cycle every 6 seconds; resets whenever activeNode changes (manual click or timer advance)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeNode]);

  const handleSelectNode = (idx: number) => {
    setActiveNode(idx);
  };

  // Inflow connector: from compact card right edge (x=188, y=240) to map edge (x=310, y=240)
  const inflowPath = "M 188 240 L 310 240";

  // Coordinates calculation for outflow connectors (960×480 canvas)
  // Act 2 starts at x=310, y=70
  // Inspection card width is 184px, height is ~108px
  const startX = 310 + HOUSEHOLDS[activeNode].cardPos.left + 184;
  const startY = 70 + HOUSEHOLDS[activeNode].cardPos.top + 54;

  const end1X = 696;
  const end1Y = 154;
  const end2X = 696;
  const end2Y = 326;

  const mid1X = (startX + end1X) / 2;
  const mid2X = (startX + end2X) / 2;

  const path1 = `M ${startX} ${startY} C ${mid1X} ${startY}, ${mid1X} ${end1Y}, ${end1X} ${end1Y}`;
  const path2 = `M ${startX} ${startY} C ${mid2X} ${startY}, ${mid2X} ${end2Y}, ${end2X} ${end2Y}`;

  return (
    <DiagramFrame
      label="Household survey data from Safe Water Gardens is mapped and shared with SWG Operations and the Indonesian Ministry"
      desktop={
        <div className="relative flex h-[480px] w-[960px] items-center justify-between p-12 select-none">
          {/* Animated SVG Connectors */}
          <svg className="pointer-events-none absolute inset-0 h-[480px] w-[960px] overflow-visible">
            <defs>
              <style>{`
                @keyframes swgDashFlow {
                  from { stroke-dashoffset: 24; }
                  to { stroke-dashoffset: 0; }
                }
                .swg-flow-stream {
                  animation: swgDashFlow 2.2s linear infinite;
                }
              `}</style>
            </defs>

            {/* 1. INFLOW CONNECTOR: Household Survey -> Kampung Map */}
            <path
              d={inflowPath}
              fill="none"
              stroke="#733635"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
              className="swg-flow-stream"
            />
            <circle cx="188" cy="240" r="3" fill="#733635" />
            <rect x="307" y="237" width="6" height="6" rx="1.5" fill="#351E1C" />
            <circle r="2.5" fill="#A0C9CB" opacity="0.95">
              <animateMotion dur="2.0s" repeatCount="indefinite" path={inflowPath} />
            </circle>

            {/* 2. OUTFLOW CONNECTORS: Inspection Card -> Spectators */}
            <rect x="693" y="151" width="6" height="6" rx="1.5" fill="#351E1C" />
            <rect x="693" y="323" width="6" height="6" rx="1.5" fill="#351E1C" />

            {/* Path 1 -> SWG Operations */}
            <path
              d={path1}
              fill="none"
              stroke="#733635"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
              className="swg-flow-stream transition-all duration-300 ease-out"
            />

            {/* Path 2 -> Indonesian Ministry / Gov */}
            <path
              d={path2}
              fill="none"
              stroke="#733635"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
              className="swg-flow-stream transition-all duration-300 ease-out"
            />

            {/* Stream Telemetry Dot 1 */}
            <circle r="2.5" fill="#FF6037" opacity="0.95">
              <animateMotion dur="2.4s" repeatCount="indefinite" path={path1} />
            </circle>

            {/* Stream Telemetry Dot 2 */}
            <circle r="2.5" fill="#A0C9CB" opacity="0.95">
              <animateMotion dur="2.8s" repeatCount="indefinite" path={path2} />
            </circle>

            {/* Inspection Card Output Port Node */}
            <circle
              cx={startX}
              cy={startY}
              r="3.5"
              fill="#733635"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Act 1 — Entry: Compact Card */}
          <IntakeCard className="w-[140px] shrink-0 z-10" />

          {/* Act 2 — Studio Craft Map */}
          <MapOrb activeNode={activeNode} onSelectNode={handleSelectNode} />

          {/* Act 3 — Spectators */}
          <div className="flex w-[216px] shrink-0 flex-col gap-4 z-10">
            <SwgOperationsCard activeNode={activeNode} className="h-[156px]" />
            <IndonesianGovCard activeNode={activeNode} className="h-[156px]" />
          </div>
        </div>
      }
      mobile={
        <div className="flex flex-col items-center gap-2">
          <IntakeCard className="w-full max-w-[220px]" />
          <DownArrow />
          <div className="origin-center scale-[0.85]">
            <MapOrb activeNode={activeNode} onSelectNode={handleSelectNode} />
          </div>
          <DownArrow />
          <div className="flex w-full max-w-[280px] flex-col gap-4">
            <SwgOperationsCard activeNode={activeNode} className="min-h-[140px]" />
            <IndonesianGovCard activeNode={activeNode} className="min-h-[140px]" />
          </div>
          <div className="mt-6 flex flex-col gap-1">
            {caption}
            {subcaption}
          </div>
        </div>
      }
    />
  );
}
