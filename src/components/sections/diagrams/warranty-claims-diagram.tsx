"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { DiagramFrame } from "./diagram-frame";

/**
 * 03 — Just Ride On: e-bike repair & warranty automation.
 *
 * 4-ticket batch wave:
 *   0ms     Read active front ticket
 *   850ms   Front ticket peels rightwards into Connector 1; pulse shoots to Card 2
 *   1200ms  Next waiting ticket pops forward from the shrinking pile (or queue clears on #4);
 *           Card 2 snaps row 1 (checkbox + Aqua/Espresso bar)
 *   1450ms  Card 2 snaps row 2
 *   1700ms  Card 2 snaps row 3 (all 3 rows fill within 0.9s)
 *   2150ms  Card 2 badge pulses Coral: "✓ CLAIM SUBMITTED"
 *   2400ms  Connector 2 pulse shoots to Card 3
 *   2850ms  Card 3 locks in claim row + progress block in Coral
 *   3900ms  Advance to next ticket (or after ticket #4, hold "ALL 4 CLAIMS PROCESSED" for 1.5s,
 *           then drop a fresh pile of 4 tickets onto the left stack)
 */

const TICKETS = [
  { tag: "01", log: "Replaced faulty torque sensor", dot: { x: 16, y: 21 } }, // bottom bracket
  { tag: "02", log: "Warranty rear hub motor swap", dot: { x: 7, y: 21 } }, // rear hub
  { tag: "03", log: "Broken handlebar display unit", dot: { x: 21.5, y: 9.2 } }, // handlebar stem
  { tag: "04", log: "Faulty battery controller unit", dot: { x: 18, y: 16 } }, // downtube
] as const;

const CLAIMS = [
  "Torque sensor + labor",
  "Rear hub motor + labor",
  "Display unit + labor",
  "Battery controller + labor",
] as const;

/** Rotations (deg) and horizontal nudges (px) for the waiting stack layers behind the front card. */
const STACK_OFFSETS = [
  { rot: -1, dx: -2, barW: 54 },
  { rot: 1.5, dx: 3, barW: 46 },
  { rot: -1.2, dx: -3, barW: 60 },
  { rot: 1, dx: 2, barW: 50 },
] as const;

const STEP = {
  read: 0,
  peel: 1, // 850ms: front ticket peels rightwards + connector 1 pulse
  row1: 2, // 1200ms: pile decrements & next ticket pops forward; bot row 1 fills
  row2: 3, // 1450ms: bot row 2 fills
  row3: 4, // 1700ms: bot row 3 fills
  submitted: 5, // 2150ms: "✓ CLAIM SUBMITTED"
  signal2: 6, // 2400ms: connector 2 pulse
  claimed: 7, // 2850ms: claim row + batch block lock in Coral
} as const;

const WAVE: ReadonlyArray<readonly [number, number]> = [
  [850, STEP.peel],
  [1200, STEP.row1],
  [1450, STEP.row2],
  [1700, STEP.row3],
  [2150, STEP.submitted],
  [2400, STEP.signal2],
  [2850, STEP.claimed],
];

const TICKET_CYCLE_MS = 3900;
const FINAL_HOLD_MS = 4350; // 2850ms + 1500ms hold on "ALL 4 CLAIMS PROCESSED"

const card =
  "relative flex flex-col rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] shadow-card";
const cardTitle = "font-display font-bold text-[#351E1C] leading-tight";
const cardSub = "font-body text-[10px] leading-tight text-[#733635]";
const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#351E1C]";

/** 1.5px dashed Terracotta connector with a square travelling pulse (no pills). */
function Connector({ vertical = false, pulse }: { vertical?: boolean; pulse: boolean }) {
  return (
    <div
      aria-hidden
      className="relative shrink-0"
      style={vertical ? { width: 12, height: 40 } : { width: 60, height: 12 }}
    >
      <svg
        width={vertical ? 12 : 60}
        height={vertical ? 40 : 12}
        viewBox={vertical ? "0 0 12 40" : "0 0 60 12"}
        fill="none"
        className="overflow-visible"
      >
        {vertical ? (
          <>
            <line x1="6" y1="0" x2="6" y2="34" stroke="#733635" strokeWidth="1.5" strokeDasharray="3 3" />
            <polyline points="2,30 6,36 10,30" stroke="#733635" strokeWidth="1.5" />
          </>
        ) : (
          <>
            <line x1="0" y1="6" x2="54" y2="6" stroke="#733635" strokeWidth="1.5" strokeDasharray="3 3" />
            <polyline points="50,2 56,6 50,10" stroke="#733635" strokeWidth="1.5" />
          </>
        )}
      </svg>
      {pulse ? (
        <span
          className={cn(
            "absolute size-2 rounded-[2px] bg-[#FF6037]",
            vertical ? "top-0 left-1 anim-pulse-y" : "top-1 left-0 anim-pulse-x",
          )}
        />
      ) : null}
    </div>
  );
}

/** 1px technical e-bike schematic; the Coral dot marks the faulty part of the active ticket. */
function BikeSchematic({ dot }: { dot: { x: number; y: number } }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="#351E1C" strokeWidth="1">
      <circle cx="7" cy="21" r="5.5" />
      <circle cx="25" cy="21" r="5.5" />
      <polyline points="7,21 14,11 22,11 25,21" />
      <polyline points="7,21 16,21 14,11" />
      <line x1="22" y1="11" x2="16" y2="21" />
      <polyline points="12,9.5 16,9.5" />
      <polyline points="22,11 21,7.5 24.5,7.5" />
      <circle
        cx="0"
        cy="0"
        r="1.8"
        fill="#FF6037"
        stroke="none"
        style={{
          transform: `translate(${dot.x}px, ${dot.y}px)`,
          transition: "transform 300ms cubic-bezier(0.3, 0.7, 0.2, 1)",
        }}
      />
    </svg>
  );
}

/**
 * Left column: backlog counter + vertical/diagonal stack of waiting ticket headers +
 * active front ticket that peels rightwards into the Form Bot.
 */
function RepairQueueCard({
  active,
  step,
  freshBatch,
  onNext,
}: {
  active: number;
  step: number;
  freshBatch: boolean;
  onNext: () => void;
}) {
  const total = TICKETS.length; // 4
  const peeled = step >= STEP.row1;
  const isPeeling = step === STEP.peel;

  // How many tickets are still sitting in the left queue (including the front card).
  const remaining = total - active - (peeled ? 1 : 0);
  // Which ticket is currently displayed on the front face of the pile.
  const frontIndex = Math.min(active + (peeled ? 1 : 0), total - 1);
  const ticket = TICKETS[frontIndex];
  // How many waiting ticket headers peek out behind/above the front card (4 at batch start -> 0 on final ticket).
  const behindCount = active === 0 && !peeled ? 4 : Math.max(0, remaining - 1);
  const queueCleared = remaining === 0;

  return (
    <div className="flex w-[176px] flex-col gap-2">
      {/* Backlog status header above the pile */}
      <div className="flex flex-col gap-1.5">
        <div aria-hidden className="flex items-center gap-1">
          {Array.from({ length: total }, (_, i) => {
            const stillPending = i < remaining;
            return (
              <span
                key={i}
                className={cn(
                  "h-2.5 w-3.5 rounded-[2px] border transition-all duration-300",
                  stillPending
                    ? "border-[#733635] bg-[#FF6037]"
                    : "border-[#ECECDC] bg-[#ECECDC]/50 scale-90",
                )}
              />
            );
          })}
        </div>
        <p
          className={cn(
            "font-body text-[10px] leading-tight font-semibold tracking-[0.06em] uppercase transition-colors duration-300",
            queueCleared ? "text-[#351E1C]" : "text-[#733635]",
          )}
        >
          {queueCleared ? "✓ Queue cleared" : `Admin backlog: ${remaining} pending`}
        </p>
      </div>

      {/* Reserved vertical headroom (34px) so the 4 stacked headers peeking above never shift layout */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Advance warranty ticket queue"
        className={cn(
          "relative mt-[34px] block w-full cursor-pointer text-left",
          freshBatch && "anim-stack-drop",
          focusRing,
        )}
      >
        {/* 4 waiting ticket headers peeking out ABOVE/BEHIND the front ticket (8px step, alternating micro-rotations) */}
        {STACK_OFFSETS.map((cfg, idx) => {
          const depth = idx + 1; // 1 = closest behind front card, 4 = top of pile
          const visible = depth <= behindCount;
          const waitingTicketNum = frontIndex + depth + 1;
          return (
            <span
              key={depth}
              aria-hidden
              style={{
                transform: visible
                  ? `translate(${cfg.dx}px, ${-depth * 8}px) rotate(${cfg.rot}deg)`
                  : "translate(0px, 0px) rotate(0deg) scale(0.96)",
                opacity: visible ? 1 : 0,
                zIndex: 10 - depth,
                transition:
                  "transform 320ms cubic-bezier(0.3, 0.7, 0.2, 1), opacity 240ms ease-out",
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-[3px] border-[1.5px] border-[#ECECDC] bg-[#F5F4ED] px-2.5 pt-1.5 shadow-sm"
            >
              {/* Tiny visible skeleton header bar inside each peeking ticket */}
              <span className="flex items-center justify-between gap-1.5">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-[1px] bg-[#733635]/70" />
                  <span
                    className="block h-[3px] rounded-[1px] bg-[#351E1C]/35"
                    style={{ width: cfg.barW }}
                  />
                </span>
                <span className="font-body text-[7px] leading-none font-semibold text-[#733635]/80">
                  {waitingTicketNum <= total ? `// 0${waitingTicketNum}` : ""}
                </span>
              </span>
            </span>
          );
        })}

        {/* Active front ticket (or empty cleared tray once all 4 tickets have fed into the bot) */}
        {queueCleared ? (
          <span
            key="cleared"
            className={cn(
              "relative z-20 flex min-h-[148px] flex-col items-center justify-center gap-2 rounded-[3px] border-[1.5px] border-dashed border-[#733635]/45 bg-[#F5F4ED]/60 p-3.5 text-center anim-ticket-pop",
            )}
          >
            <span className="flex size-7 items-center justify-center rounded-[2px] bg-[#A0C9CB]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#351E1C" strokeWidth="1.5">
                <polyline points="2,6.5 5,9.5 10,3" />
              </svg>
            </span>
            <span className={cn(cardTitle, "text-[12px]")}>All 4 tickets fed</span>
            <span className="font-body text-[10px] leading-tight text-[#733635]">
              Zero manual forms left in workshop tray
            </span>
          </span>
        ) : (
          <span
            key={frontIndex}
            className={cn(
              card,
              "z-20 gap-2.5 p-3.5 transition-all duration-350 ease-in-out",
              isPeeling
                ? "translate-x-4 scale-95 opacity-0"
                : "translate-x-0 scale-100 opacity-100 anim-ticket-pop",
            )}
          >
            <span className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[2px] bg-[#ECECDC]/60">
                <BikeSchematic dot={ticket.dot} />
              </span>
              <span className="block font-body text-[9px] leading-tight font-semibold tracking-[0.08em] text-[#733635]">
                REPAIR QUEUE
                <br />
                {`// ${ticket.tag} OF 04`}
              </span>
            </span>
            <span className={cn(cardTitle, "block text-[13px]")}>Warranty Ticket</span>
            <span className="block min-h-[44px] rounded-[2px] bg-[#ECECDC]/45 p-2 font-body text-[11px] leading-tight text-[#351E1C]">
              {ticket.log}
            </span>
          </span>
        )}
      </button>
    </div>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-px flex size-[10px] shrink-0 items-center justify-center rounded-[2px] border border-[#351E1C] transition-colors duration-150",
        checked ? "bg-[#351E1C]" : "bg-[#F5F4ED]",
      )}
    >
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        stroke="#F5F4ED"
        strokeWidth="1.2"
        className={cn("transition-opacity duration-150", checked ? "opacity-100" : "opacity-0")}
      >
        <polyline points="1,3 2.5,4.5 5,1.5" />
      </svg>
    </span>
  );
}

function FormRow({ label, filled }: { label: string; filled: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox checked={filled} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="font-body text-[11px] leading-tight text-[#351E1C]">{label}</p>
        <span aria-hidden className="relative block h-[6px] w-full overflow-hidden rounded-[1px] bg-[#ECECDC]">
          <span
            className="absolute inset-y-0 left-0 flex rounded-[1px] bg-[#A0C9CB]"
            style={{
              width: filled ? "100%" : "0%",
              transition: filled
                ? "width 380ms cubic-bezier(0.2, 0.85, 0.25, 1)"
                : "width 120ms ease-out",
            }}
          >
            {/* Espresso value segment + leading edge */}
            <span className="h-full w-2/5 rounded-l-[1px] bg-[#351E1C]" />
            <span className="ml-auto h-full w-[2px] bg-[#351E1C]" />
          </span>
        </span>
      </div>
    </div>
  );
}

function FormBotCard({ active, step }: { active: number; step: number }) {
  const submitted = step >= STEP.submitted;
  return (
    <div className={cn(card, "w-[215px] gap-3 p-4")}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-1">
          <p className={cn(cardTitle, "text-[14px]")}>Supplier Form Bot</p>
          <span className="rounded-[2px] bg-[#ECECDC]/70 px-1.5 py-0.5 font-body text-[8px] leading-none font-semibold text-[#733635]">
            {`#${TICKETS[active].tag}`}
          </span>
        </div>
        <p className={cardSub}>Automated portal entry (no API)</p>
      </div>
      <div className="flex flex-col gap-3">
        <FormRow label="Extract bike & frame ID" filled={step >= STEP.row1} />
        <FormRow label="Fill replacement part form" filled={step >= STEP.row2} />
        <FormRow label="Submit labor reimbursement" filled={step >= STEP.row3} />
      </div>
      <div className="flex justify-end">
        <span
          key={submitted ? "submitted" : "filling"}
          className={cn(
            "rounded-[2px] px-2 py-0.5 font-body text-[9px] leading-normal font-semibold tracking-[0.06em] uppercase transition-colors duration-200",
            submitted
              ? "anim-badge-pulse bg-[#FF6037] text-[#F5F4ED]"
              : "bg-[#ECECDC] text-[#351E1C]",
          )}
        >
          {submitted ? "✓ Claim submitted" : "Auto-filling form"}
        </span>
      </div>
    </div>
  );
}

function ClaimRow({
  label,
  completed,
  onSelect,
}: {
  label: string;
  completed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full cursor-pointer items-start gap-2 text-left transition-opacity duration-250",
        completed ? "opacity-100" : "opacity-35",
        focusRing,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-px flex size-[10px] shrink-0 items-center justify-center rounded-[2px] transition-colors duration-200",
          completed ? "bg-[#FF6037]" : "border border-[#351E1C]/40 bg-[#ECECDC]",
        )}
      >
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          stroke="#F5F4ED"
          strokeWidth="1.2"
          className={cn("transition-opacity duration-200", completed ? "opacity-100" : "opacity-0")}
        >
          <polyline points="1,3 2.5,4.5 5,1.5" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="block font-body text-[11px] leading-tight text-[#351E1C]">{label}</span>
        <span
          aria-hidden
          className={cn(
            "block h-[4px] rounded-[1px] transition-all duration-300",
            completed ? "w-full bg-[#FF6037]" : "w-2/5 bg-[#ECECDC]",
          )}
        />
      </span>
    </button>
  );
}

function ClaimsLedgerCard({
  active,
  step,
  onSelect,
}: {
  active: number;
  step: number;
  onSelect: (i: number) => void;
}) {
  const currentClaimed = step >= STEP.claimed;
  const completedCount = active + (currentClaimed ? 1 : 0);
  const allProcessed = completedCount === CLAIMS.length;

  return (
    <div className={cn(card, "w-[200px] gap-2.5 p-3.5")}>
      <div className="flex flex-col gap-1">
        <p className={cn(cardTitle, "text-[13px]")}>Claims &amp; Payouts</p>
        <p className={cardSub}>Parts &amp; warranty money back</p>
      </div>
      <div className="flex flex-col gap-2">
        {CLAIMS.map((label, i) => (
          <ClaimRow
            key={label}
            label={label}
            completed={i < completedCount}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
      {/* 4 cumulative progress blocks (1 per claim) */}
      <div aria-hidden className="flex gap-1 pt-0.5">
        {CLAIMS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-3 flex-1 rounded-[2px] transition-colors duration-250",
              i < completedCount ? "bg-[#FF6037]" : "bg-[#ECECDC]",
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span
          key={allProcessed ? "all-done" : "in-flight"}
          className={cn(
            "rounded-[2px] px-2 py-0.5 font-body text-[9px] leading-normal font-semibold tracking-[0.06em] uppercase transition-colors duration-200",
            allProcessed
              ? "anim-badge-pulse bg-[#FF6037] text-[#F5F4ED]"
              : "bg-[#ECECDC] text-[#351E1C]",
          )}
        >
          {allProcessed ? "✓ All 4 claims processed" : `${completedCount} of 4 reimbursed`}
        </span>
      </div>
      <p className="font-body text-[10px] leading-tight text-[#733635]">
        Automatically claims replacement parts and repair payouts without manual typing.
      </p>
    </div>
  );
}

export function WarrantyClaimsDiagram() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState<number>(STEP.read);
  const [freshBatch, setFreshBatch] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const isLastTicket = active === TICKETS.length - 1;
    const cycleEnd = isLastTicket ? FINAL_HOLD_MS : TICKET_CYCLE_MS;

    const timers = WAVE.map(([at, s]) => setTimeout(() => setStep(s), at));
    if (freshBatch) {
      timers.push(setTimeout(() => setFreshBatch(false), 600));
    }
    timers.push(
      setTimeout(() => {
        setStep(STEP.read);
        if (isLastTicket) {
          setFreshBatch(true);
          setActive(0);
        } else {
          setActive((a) => a + 1);
        }
      }, cycleEnd),
    );
    return () => timers.forEach(clearTimeout);
  }, [active, run, freshBatch]);

  const jump = (i: number) => {
    setFreshBatch(i === 0);
    setActive(i);
    setStep(STEP.read);
    setRun((r) => r + 1);
  };
  const next = () => jump((active + 1) % TICKETS.length);

  const queue = (
    <RepairQueueCard active={active} step={step} freshBatch={freshBatch} onNext={next} />
  );
  const bot = <FormBotCard active={active} step={step} />;
  const ledger = <ClaimsLedgerCard active={active} step={step} onSelect={jump} />;
  const pulse1 = step === STEP.peel;
  const pulse2 = step === STEP.signal2;

  return (
    <DiagramFrame
      label="Four pending e-bike warranty tickets peel off the workshop backlog pile into the supplier form bot and fill the claims and payouts ledger"
      desktop={
        <div className="flex h-full w-full items-center justify-center bg-transparent">
          {queue}
          <Connector pulse={pulse1} />
          {bot}
          <Connector pulse={pulse2} />
          {ledger}
        </div>
      }
      mobile={
        <div className="flex flex-col items-center gap-2 bg-transparent">
          {queue}
          <Connector vertical pulse={pulse1} />
          {bot}
          <Connector vertical pulse={pulse2} />
          {ledger}
        </div>
      }
    />
  );
}
