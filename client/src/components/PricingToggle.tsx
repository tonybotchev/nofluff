import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";

interface Tier {
  id: "starter" | "growth" | "pro";
  name: string;
  monthly: number;
  annual: number;
  tagline: string;
  features: string[];
  highlight?: boolean;
  cta: { label: string; href: string };
}

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 197,
    annual: 177,
    tagline: "Everything a solo agent needs to stop losing leads.",
    features: [
      "AI CRM + unified inbox (SMS, email, DMs)",
      "Pipelines, tags, smart lists",
      "Drag-and-drop funnel builder",
      "Calendar + automated booking",
      "1,000 contacts",
      "Email + SMS campaigns",
      "Basic reputation management",
    ],
    cta: { label: "Start Starter", href: "#contact" },
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 297,
    annual: 267,
    highlight: true,
    tagline: "The revenue system most DFW agents actually need.",
    features: [
      "Everything in Starter",
      "AI voice agent (inbound + outbound)",
      "Dead Database Reactivation included",
      "5,000 contacts",
      "ListingSentinel Lite (25 alerts/mo)",
      "Missed-call text-back",
      "Priority support",
    ],
    cta: { label: "Start Growth", href: "#contact" },
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 497,
    annual: 447,
    tagline: "For the operator building a real brokerage-grade engine.",
    features: [
      "Everything in Growth",
      "ListingSentinel Pro (unlimited zips)",
      "Answer Engine Optimization (AEO) program",
      "4 listing reels per month",
      "Social media management (3 platforms)",
      "Unlimited contacts & sub-accounts",
      "Dedicated growth strategist",
    ],
    cta: { label: "Start Pro", href: "#contact" },
  },
];

export function PricingToggle() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const isAnnual = billing === "annual";

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-10">
        <span
          className={cn(
            "text-sm font-display tracking-[0.15em] transition-colors",
            !isAnnual ? "text-white" : "text-ink-400"
          )}
        >
          MONTHLY
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={(v) => setBilling(v ? "annual" : "monthly")}
          aria-label="Toggle annual billing"
        />
        <span
          className={cn(
            "text-sm font-display tracking-[0.15em] transition-colors flex items-center gap-2",
            isAnnual ? "text-white" : "text-ink-400"
          )}
        >
          ANNUAL
          <span className="rounded-full bg-texas-500/20 text-texas-400 px-2 py-0.5 text-[10px] font-bold tracking-wider">
            SAVE 10%
          </span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((tier) => {
          const price = isAnnual ? tier.annual : tier.monthly;
          return (
            <div
              key={tier.id}
              className={cn(
                "relative rounded-2xl p-8 flex flex-col border backdrop-blur-sm transition-all",
                tier.highlight
                  ? "border-texas-500/60 bg-gradient-to-b from-texas-500/10 to-ink-900/70 shadow-[0_30px_80px_-40px_rgba(224,90,26,0.5)] md:-translate-y-3"
                  : "border-white/8 bg-ink-900/60 hover:border-white/15"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-texas-500 px-4 py-1 text-[10px] font-display tracking-[0.2em] text-white">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-3xl mb-1">{tier.name}</h3>
              <p className="text-sm text-ink-300 leading-relaxed mb-6">
                {tier.tagline}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl text-white tabular-nums">
                    ${price}
                  </span>
                  <span className="text-ink-300 text-sm">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-xs text-texas-400 mt-1 font-medium">
                    Billed annually · Save ${(tier.monthly - tier.annual) * 12}
                    /yr
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-ink-100"
                  >
                    <Check className="size-4 text-texas-500 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={tier.highlight ? "default" : "outline"}
                size="lg"
                className="w-full"
              >
                <a href={tier.cta.href}>{tier.cta.label}</a>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
