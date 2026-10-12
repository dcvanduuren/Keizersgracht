"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const labelClass =
  "font-body text-badge font-semibold tracking-badge-caps text-terracotta uppercase";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: no backend is wired up yet. Send `new FormData(event.currentTarget)`
    // to an API route / form service here before shipping.
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      suppressHydrationWarning
      className="flex w-full flex-col gap-5 rounded-[3px] bg-sand/60 p-6 shadow-card backdrop-blur-sm sm:p-8"
    >
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
          placeholder="you@example.com"
          suppressHydrationWarning
          className="w-full rounded-[3px] border border-border-subtle bg-canvas px-6 py-4 font-body text-body text-espresso placeholder:text-taupe focus-visible:border-espresso focus-visible:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          What&apos;s on your mind?
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="A quick note about the product, the problem, or the direction you're thinking about."
          suppressHydrationWarning
          className="h-40 w-full resize-none rounded-[3px] border border-border-subtle bg-canvas px-5 py-4 font-body text-body-sm leading-[1.65] text-espresso placeholder:text-taupe focus-visible:border-espresso focus-visible:outline-none"
        />
      </div>
      <Button type="submit" className="self-start">
        Start the talk
      </Button>
      <p role="status" className="font-body text-body-sm leading-[1.65] text-terracotta">
        {sent
          ? "Thanks! Message received — we'll get back to you within 24 hours."
          : "We typically reply within one business day."}
      </p>
    </form>
  );
}
