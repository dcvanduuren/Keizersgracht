"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const labelClass =
  "font-body text-badge font-semibold tracking-badge-caps text-terracotta uppercase";

const inputClass =
  "w-full rounded-pill border border-border-subtle/80 bg-white/70 px-5 py-3.5 font-body text-body text-espresso placeholder:text-taupe transition-all focus-visible:border-espresso focus-visible:bg-white focus-visible:outline-none";

const topics = [
  "Custom Software",
  "AI & Automation",
  "Data Pipelines",
  "Quick Question",
] as const;

export function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[number]>("Custom Software");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      suppressHydrationWarning
      className="flex w-full flex-col gap-6 rounded-card-lg border border-border-subtle/80 bg-canvas p-6 shadow-card transition-all sm:p-9"
    >
      {/* Topic selection chips */}
      <div className="flex flex-col gap-2.5">
        <label className={labelClass}>I&apos;m interested in</label>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-pill px-3.5 py-1.5 font-body text-label font-semibold transition-all ${
                  isSelected
                    ? "bg-coral text-espresso shadow-xs"
                    : "border border-border-subtle/80 bg-canvas text-terracotta hover:border-espresso hover:text-espresso"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Name & Email inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            suppressHydrationWarning
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            suppressHydrationWarning
            className={inputClass}
          />
        </div>
      </div>

      {/* Message textarea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          What&apos;s on your mind?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us a bit about the tool, the workflow, or what you'd like to build."
          suppressHydrationWarning
          className="h-32 w-full resize-none rounded-card border border-border-subtle/80 bg-white/70 p-5 font-body text-body-sm leading-[1.65] text-espresso placeholder:text-taupe transition-all focus-visible:border-espresso focus-visible:bg-white focus-visible:outline-none"
        />
      </div>

      {/* Action & status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" className="self-start">
          Start the talk
        </Button>
        <p role="status" className="font-body text-body-sm text-terracotta">
          {sent
            ? "✓ Message received! We'll reply within 24 hours."
            : "We typically reply within one business day."}
        </p>
      </div>
    </form>
  );
}
