"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { DownArrow } from "./parts";
import { DiagramFrame } from "./diagram-frame";

/* ------------------------------------------------------------------ */
/* Types & Base Styling                                               */
/* ------------------------------------------------------------------ */

export type Mode = 0 | 1 | 2;
export type Phase = "input" | "routing" | "drafting";

const CARD_BASE =
  "flex flex-col justify-between rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] shadow-card";

/* ------------------------------------------------------------------ */
/* Minimal Icons (1.5px Stroke)                                       */
/* ------------------------------------------------------------------ */

function EnvelopeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="#351E1C" strokeWidth="1.5" />
      <path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="#351E1C" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 3.5h10a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H8.5L5 13.5V11H3a1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1Z"
        stroke="#A0C9CB"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="#733635" strokeWidth="1.5" />
      <path
        d="M5.5 3.5V2.5C5.5 1.95 5.95 1.5 6.5 1.5H9.5C10.05 1.5 10.5 1.95 10.5 2.5V3.5"
        stroke="#733635"
        strokeWidth="1.3"
      />
      <line x1="5.5" y1="7" x2="10.5" y2="7" stroke="#733635" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5.5" y1="9.8" x2="8.5" y2="9.8" stroke="#733635" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Card 1 — Compact Vertical Flipping Request (Width ~145px)          */
/* ------------------------------------------------------------------ */

const REQUEST_MODES = [
  {
    channel: "EMAIL",
    title: "Quote Request",
    question: "What is the price for this?",
    icon: <EnvelopeIcon />,
  },
  {
    channel: "WHATSAPP",
    title: "Spot Inquiry",
    question: "When can I schedule a time with you?",
    icon: <ChatBubbleIcon />,
  },
  {
    channel: "WEB FORM",
    title: "New Lead",
    question: "Interested in a custom project.",
    icon: <ClipboardIcon />,
  },
] as const;

function RequestFace({ mode, className }: { mode: Mode; className?: string }) {
  const req = REQUEST_MODES[mode];

  return (
    <div
      className={cn(
        CARD_BASE,
        "h-full w-full p-3",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#ECECDC]/60">
          {req.icon}
        </div>
        <span className="font-body text-[9px] font-semibold tracking-wider text-[#733635] uppercase">
          {req.channel}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 pt-0.5">
        <p className="font-display text-[13px] leading-tight font-bold text-[#351E1C]">
          {req.title}
        </p>
      </div>

      {/* Single Clear Question Bubble */}
      <div className="rounded-[2px] bg-[#ECECDC]/45 p-2">
        <p className="font-body text-[11px] leading-snug font-medium text-[#351E1C]">
          &ldquo;{req.question}&rdquo;
        </p>
      </div>
    </div>
  );
}

function CompactRequestCard({
  activeMode,
  onToggle,
  className,
}: {
  activeMode: Mode;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle incoming request"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn("cursor-pointer outline-none [perspective:800px]", className)}
      style={{ width: 145, height: 156 }}
    >
      <div
        key={activeMode}
        className="card-vertical-flip h-full w-full motion-reduce:animate-none"
      >
        <RequestFace mode={activeMode} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card 2 — Prominent AI Hub (Width 206px, Height 204px)              */
/* ------------------------------------------------------------------ */

const DYNAMIC_ROUTES = [
  { label: "Pricing & specs", mode: 0 as const },
  { label: "Live schedule & CRM", mode: 1 as const },
  { label: "Follow-up email flow", mode: 2 as const },
];

function CompactRoutingCard({
  activeMode,
  phase,
  onSelect,
  className,
}: {
  activeMode: Mode;
  phase: Phase;
  onSelect: (mode: Mode) => void;
  className?: string;
}) {
  const isRoutingActive = phase === "routing" || phase === "drafting";

  return (
    <div
      className={cn(CARD_BASE, "justify-start gap-2.5 p-3.5", className)}
      style={{ width: 206, height: 204 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-0.5 border-b border-[#ECECDC] pb-1.5">
        <div className="flex items-center justify-between">
          <p className="font-display text-[14px] leading-tight font-bold text-[#351E1C]">
            AI Agent
          </p>
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#A0C9CB] animate-pulse" />
        </div>
        <span className="font-body text-[10px] leading-tight text-[#733635]">
          Trained on team data
        </span>
      </div>

      {/* 4-Row Checklist */}
      <div className="flex flex-col gap-1.5">
        {/* Row 1: Permanent Knowledge base */}
        <div className="flex items-center gap-2 rounded-[2px] border border-[#ECECDC]/80 bg-[#ECECDC]/60 px-2 py-1.5">
          <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] border border-[#351E1C] bg-[#351E1C]">
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" aria-hidden>
              <path
                d="M1 2.5L2.5 4L5 1"
                stroke="#F5F4ED"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-body text-[10.5px] leading-tight font-semibold text-[#351E1C]">
            Knowledge base
          </span>
          <span className="ml-auto font-body text-[8.5px] font-medium tracking-wider text-[#733635] uppercase">
            core
          </span>
        </div>

        {/* Dynamic Rows 2, 3, 4 */}
        {DYNAMIC_ROUTES.map((r) => {
          const isActive = isRoutingActive && activeMode === r.mode;

          return (
            <button
              key={r.label}
              type="button"
              onClick={() => onSelect(r.mode)}
              className={cn(
                "flex items-center gap-2 rounded-[2px] px-2 py-1.5 text-left outline-none transition-all duration-300",
                isActive
                  ? "border border-[#A0C9CB] bg-[#A0C9CB]/25 opacity-100 shadow-sm"
                  : "border border-transparent opacity-45 hover:opacity-75",
              )}
            >
              {/* 10x10px Checkbox */}
              <span
                className={cn(
                  "flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] border transition-all duration-200",
                  isActive
                    ? "border-[#351E1C] bg-[#351E1C]"
                    : "border-[#ECECDC] bg-[#ECECDC]",
                )}
              >
                {isActive && (
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none" aria-hidden>
                    <path
                      d="M1 2.5L2.5 4L5 1"
                      stroke="#F5F4ED"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              <span className="font-body text-[10.5px] leading-tight font-semibold text-[#351E1C]">
                {r.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card 3 — Compact Ready Draft (Width 195px, Height 156px)           */
/* ------------------------------------------------------------------ */

const DRAFT_REPLIES = [
  "Hi there, based on your project specs, the estimated price comes to...",
  "Hi there, checking our schedule, we have spots available for you on...",
  "Hi there, reviewing your project details, our onboarding outline is...",
] as const;

function CompactDraftCard({
  activeMode,
  phase,
  className,
}: {
  activeMode: Mode;
  phase: Phase;
  className?: string;
}) {
  const currentReply = DRAFT_REPLIES[activeMode];
  const [typedChars, setTypedChars] = useState(0);
  const [isReviewActive, setIsReviewActive] = useState(false);

  useEffect(() => {
    setTypedChars(0);
    setIsReviewActive(false);

    if (phase !== "drafting") {
      return;
    }

    let count = 0;
    let typeInterval: NodeJS.Timeout | null = null;
    let pulseStartTimer: NodeJS.Timeout | null = null;
    let pulseEndTimer: NodeJS.Timeout | null = null;

    typeInterval = setInterval(() => {
      count += 1;
      setTypedChars(count);
      if (count >= currentReply.length) {
        if (typeInterval) clearInterval(typeInterval);
        // Trigger pulse on Coral button right as sentence finishes typing (~2.1s)
        pulseStartTimer = setTimeout(() => {
          setIsReviewActive(true);
        }, 100);

        pulseEndTimer = setTimeout(() => {
          setIsReviewActive(false);
        }, 1500);
      }
    }, 30);

    return () => {
      if (typeInterval) clearInterval(typeInterval);
      if (pulseStartTimer) clearTimeout(pulseStartTimer);
      if (pulseEndTimer) clearTimeout(pulseEndTimer);
    };
  }, [activeMode, phase, currentReply]);

  return (
    <div
      className={cn(CARD_BASE, "justify-between p-3.5", className)}
      style={{ width: 195, height: 156 }}
    >
      <div className="flex flex-col gap-0.5 border-b border-[#ECECDC] pb-1">
        <p className="font-display text-[13px] leading-tight font-bold text-[#351E1C]">
          Ready Draft
        </p>
        <span className="font-body text-[10px] leading-tight text-[#733635]">
          Review &amp; send
        </span>
      </div>

      {/* Inner Draft Box with Typewritten Reply */}
      <div className="flex flex-col justify-start rounded-[2px] bg-[#ECECDC]/40 p-2 min-h-[58px]">
        {phase === "drafting" ? (
          <p className="font-body text-[10.5px] leading-[14px] font-medium text-[#351E1C]">
            <span>{currentReply.slice(0, typedChars)}</span>
            <span
              className="inline-block h-[10px] w-[2px] bg-[#351E1C] ml-0.5 align-baseline animate-pulse"
              aria-hidden
            />
          </p>
        ) : (
          <div className="flex h-full items-center gap-1.5 py-1 text-[#733635]/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#733635]/50 animate-pulse" />
            <span className="font-body text-[10px] italic">Awaiting AI routing...</span>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          className={cn(
            "rounded-[2px] bg-[#FF6037] px-2.5 py-1 font-body text-[10px] leading-none font-semibold uppercase tracking-wider text-[#F5F4ED] transition-all duration-300",
            isReviewActive && "scale-105 ring-2 ring-[#FF6037]/50 shadow-sm brightness-105",
          )}
        >
          Approve &amp; Send
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Master Schematic Layout: Sequential Left-to-Right Wave Flow        */
/* ------------------------------------------------------------------ */

export function AdminIntakeDiagram() {
  const [activeMode, setActiveMode] = useState<Mode>(0);
  const [phase, setPhase] = useState<Phase>("input");
  const [cycleKey, setCycleKey] = useState(0);

  // 7.5s sequential wave cycle
  useEffect(() => {
    // 0.0s: Phase 1 — Input at Card 1
    setPhase("input");

    // 1.5s: Phase 2 — AI Agent Routing at Card 2 (Connector 1 signal arrived)
    const routingTimer = setTimeout(() => {
      setPhase("routing");
    }, 1500);

    // 3.0s: Phase 3 — Drafting at Card 3 (Connector 2 signal arrived)
    const draftingTimer = setTimeout(() => {
      setPhase("drafting");
    }, 3000);

    // 7.5s: Loop advances to next mode
    const cycleTimer = setTimeout(() => {
      setActiveMode((m) => ((m + 1) % 3) as Mode);
      setCycleKey((k) => k + 1);
    }, 7500);

    return () => {
      clearTimeout(routingTimer);
      clearTimeout(draftingTimer);
      clearTimeout(cycleTimer);
    };
  }, [activeMode, cycleKey]);

  const selectMode = (m: Mode) => {
    setActiveMode(m);
    setCycleKey((k) => k + 1);
  };

  const toggle = () => {
    setActiveMode((m) => ((m + 1) % 3) as Mode);
    setCycleKey((k) => k + 1);
  };

  // Canvas Geometry (960 x 480):
  // Centerline y = 240
  // Card 1: x = 137, w = 145 (ends at 282)
  // Gap 1: x = 282 -> 352 (length 70px)
  // Card 2: x = 352, w = 206 (ends at 558)
  // Gap 2: x = 558 -> 628 (length 70px)
  // Card 3: x = 628, w = 195 (ends at 823)
  const y = 240;

  return (
    <DiagramFrame
      label="An incoming client message is analyzed by an AI agent and prepared into a ready-to-send draft"
      desktop={
        <div className="relative flex h-[480px] w-[960px] items-center justify-center select-none bg-transparent">
          {/* Animated SVG Connector Lines */}
          <svg
            key={cycleKey}
            className="pointer-events-none absolute inset-0 h-[480px] w-[960px] overflow-visible"
            aria-hidden
          >
            <defs>
              <style>{`
                @keyframes intakeFlow {
                  from { stroke-dashoffset: 24; }
                  to { stroke-dashoffset: 0; }
                }
                .intake-flow-line {
                  animation: intakeFlow 2s linear infinite;
                }
                @keyframes verticalFlip {
                  0% {
                    transform: perspective(600px) rotateX(-90deg) scale(0.92);
                    opacity: 0;
                  }
                  60% {
                    transform: perspective(600px) rotateX(6deg) scale(1.01);
                    opacity: 1;
                  }
                  100% {
                    transform: perspective(600px) rotateX(0deg) scale(1);
                    opacity: 1;
                  }
                }
                .card-vertical-flip {
                  animation: verticalFlip 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
              `}</style>
            </defs>

            {/* ---------------- CONNECTOR 1: Card 1 -> Card 2 ---------------- */}

            {/* Conduit Base Dashed Line */}
            <line
              x1={282}
              y1={y}
              x2={352}
              y2={y}
              stroke="#733635"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              strokeOpacity="0.85"
              className="intake-flow-line"
            />

            {/* Active Conduit Glow Underlay (illuminates when data is in transit) */}
            <line
              x1={282}
              y1={y}
              x2={352}
              y2={y}
              stroke="#A0C9CB"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0; 0; 0.7; 0.7; 0; 0"
                keyTimes="0; 0.08; 0.11; 0.19; 0.21; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </line>

            {/* Card 1 Exit Terminal & Launch Ripple at (282, y) */}
            <circle cx={282} cy={y} r="3.5" fill="#733635" />
            <circle cx={282} cy={y} fill="none" stroke="#A0C9CB" strokeWidth="2">
              <animate
                attributeName="r"
                values="3; 3; 14; 14; 3"
                keyTimes="0; 0.08; 0.13; 0.14; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.95; 0; 0"
                keyTimes="0; 0.08; 0.09; 0.135; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Card 2 Entry Terminal & Arrival Ripple at (352, y) */}
            <rect x={348} y={y - 4} width={8} height={8} rx={1.5} fill="#351E1C" />
            <circle cx={352} cy={y} fill="none" stroke="#A0C9CB" strokeWidth="2.5">
              <animate
                attributeName="r"
                values="3; 3; 18; 18; 3"
                keyTimes="0; 0.195; 0.25; 0.26; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 1; 0; 0"
                keyTimes="0; 0.195; 0.205; 0.255; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 1: Glowing Halo Aura */}
            <circle r="9" fill="#A0C9CB">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 282 240 L 352 240"
                keyTimes="0; 0.093; 0.20; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.6; 0.6; 0; 0"
                keyTimes="0; 0.09; 0.105; 0.19; 0.205; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 1: Lead Data Bead (Espresso core with sharp Aqua border) */}
            <circle r="4.5" fill="#351E1C" stroke="#A0C9CB" strokeWidth="2">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 282 240 L 352 240"
                keyTimes="0; 0.093; 0.20; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 1; 1; 0; 0"
                keyTimes="0; 0.09; 0.096; 0.198; 0.204; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 1: Trailing Satellite Bead 1 */}
            <circle r="3" fill="#A0C9CB">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 272 240 L 342 240"
                keyTimes="0; 0.107; 0.214; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.95; 0.95; 0; 0"
                keyTimes="0; 0.102; 0.115; 0.206; 0.216; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 1: Trailing Satellite Bead 2 */}
            <circle r="2" fill="#733635">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 264 240 L 334 240"
                keyTimes="0; 0.118; 0.225; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.8; 0.8; 0; 0"
                keyTimes="0; 0.113; 0.125; 0.218; 0.227; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* ---------------- CONNECTOR 2: Card 2 -> Card 3 ---------------- */}

            {/* Conduit Base Dashed Line */}
            <line
              x1={558}
              y1={y}
              x2={628}
              y2={y}
              stroke="#733635"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              strokeOpacity="0.85"
              className="intake-flow-line"
            />

            {/* Active Conduit Glow Underlay */}
            <line
              x1={558}
              y1={y}
              x2={628}
              y2={y}
              stroke="#A0C9CB"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0; 0; 0.7; 0.7; 0; 0"
                keyTimes="0; 0.28; 0.31; 0.39; 0.41; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </line>

            {/* Card 2 Exit Terminal & Launch Ripple at (558, y) */}
            <circle cx={558} cy={y} r="3.5" fill="#733635" />
            <circle cx={558} cy={y} fill="none" stroke="#A0C9CB" strokeWidth="2">
              <animate
                attributeName="r"
                values="3; 3; 14; 14; 3"
                keyTimes="0; 0.28; 0.33; 0.34; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.95; 0; 0"
                keyTimes="0; 0.28; 0.29; 0.335; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Card 3 Entry Terminal & Arrival Ripple at (628, y) */}
            <rect x={624} y={y - 4} width={8} height={8} rx={1.5} fill="#351E1C" />
            <circle cx={628} cy={y} fill="none" stroke="#FF6037" strokeWidth="2.5">
              <animate
                attributeName="r"
                values="3; 3; 18; 18; 3"
                keyTimes="0; 0.395; 0.45; 0.46; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 1; 0; 0"
                keyTimes="0; 0.395; 0.405; 0.455; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 2: Glowing Halo Aura */}
            <circle r="9" fill="#351E1C">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 558 240 L 628 240"
                keyTimes="0; 0.293; 0.40; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.45; 0.45; 0; 0"
                keyTimes="0; 0.29; 0.305; 0.39; 0.405; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 2: Lead Data Bead (Espresso core with sharp Aqua border) */}
            <circle r="4.5" fill="#351E1C" stroke="#A0C9CB" strokeWidth="2">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 558 240 L 628 240"
                keyTimes="0; 0.293; 0.40; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 1; 1; 0; 0"
                keyTimes="0; 0.29; 0.296; 0.398; 0.404; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 2: Trailing Satellite Bead 1 */}
            <circle r="3" fill="#A0C9CB">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 548 240 L 618 240"
                keyTimes="0; 0.307; 0.414; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.95; 0.95; 0; 0"
                keyTimes="0; 0.302; 0.315; 0.406; 0.416; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* PACKET 2: Trailing Satellite Bead 2 */}
            <circle r="2" fill="#733635">
              <animateMotion
                dur="7.5s"
                repeatCount="indefinite"
                path="M 540 240 L 610 240"
                keyTimes="0; 0.318; 0.425; 1"
                keyPoints="0; 0; 1; 1"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0; 0; 0.8; 0.8; 0; 0"
                keyTimes="0; 0.313; 0.325; 0.418; 0.427; 1"
                dur="7.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Centered 3-Card Flow with Elevated Central Hub */}
          <div className="relative z-10 flex items-center" style={{ gap: 70 }}>
            <CompactRequestCard activeMode={activeMode} onToggle={toggle} />
            <CompactRoutingCard
              activeMode={activeMode}
              phase={phase}
              onSelect={selectMode}
            />
            <CompactDraftCard activeMode={activeMode} phase={phase} />
          </div>
        </div>
      }
      mobile={
        <div className="flex flex-col items-center gap-3">
          <CompactRequestCard activeMode={activeMode} onToggle={toggle} />
          <DownArrow />
          <CompactRoutingCard
            activeMode={activeMode}
            phase={phase}
            onSelect={selectMode}
          />
          <DownArrow />
          <CompactDraftCard activeMode={activeMode} phase={phase} />
        </div>
      }
    />
  );
}
