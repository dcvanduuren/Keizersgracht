import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-coral px-7 py-4 font-body text-body font-semibold tracking-button text-espresso opacity-90 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso";

type AnchorProps = ComponentPropsWithoutRef<"a"> & { href: string };
type NativeButtonProps = ComponentPropsWithoutRef<"button"> & { href?: undefined };

/** Primary coral CTA. Renders an <a> when `href` is given, otherwise a <button>. */
export function Button(props: AnchorProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const { className, ...rest } = props as AnchorProps;
    return <a suppressHydrationWarning className={cn(base, className)} {...rest} />;
  }
  const { className, type = "button", ...rest } = props as NativeButtonProps;
  return <button type={type} suppressHydrationWarning className={cn(base, className)} {...rest} />;
}
