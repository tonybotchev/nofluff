import {
  ArrowRight,
  Upload,
  Mic,
  PhoneCall,
  CalendarCheck,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { ROICalculator } from "@/components/ROICalculator";
import {
  breadcrumbList,
  howToSchema,
  serviceDeadDatabase,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: Upload,
    title: "Upload your list",
    body: "Drop a CSV of old leads — name and phone is enough. No data cleanup, no CRM wrangling.",
  },
  {
    icon: Mic,
    title: "Clone your voice & pick a script",
    body: "Choose a proven real-estate or mortgage script (or bring your own). Clone your voice in 90 seconds.",
  },
  {
    icon: PhoneCall,
    title: "The AI runs the dials — 24/7",
    body: "It handles objections, texts follow-ups to non-answers, and never burns out. All calls are recorded and transcribed.",
  },
  {
    icon: CalendarCheck,
    title: "Appointments land on your calendar",
    body: "Only qualified, warm leads get booked. You walk in prepared with full call transcripts.",
  },
];

const PLANS = [
  {
    name: "Ignite",
    price: 297,
    calls: "1,000 dials/mo",
    features: [
      "1 voice clone",
      "1 script",
      "SMS follow-up",
      "Call recordings & transcripts",
      "Calendar booking",
    ],
  },
  {
    name: "Reactivate",
    price: 497,
    highlight: true,
    calls: "3,000 dials/mo",
    features: [
      "Everything in Ignite",
      "A/B script testing",
      "Conditional branching",
      "CRM sync (any major CRM)",
      "Priority support",
    ],
  },
  {
    name: "Dominate",
    price: 797,
    calls: "8,000 dials/mo",
    features: [
      "Everything in Reactivate",
      "Multi-voice, multi-campaign",
      "Dedicated phone numbers per market",
      "Custom objection playbooks",
      "Dedicated strategist",
    ],
  },
];

export default function DeadDatabase() {
  const jsonLd = [
    serviceDeadDatabase,
    howToSchema,
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Dead Database Reactivation", path: "/dead-database" },
    ]),
  ];

  return (
    <>
      <SEOHead
        title="Dead Database Reactivation | AI Voice Agents for DFW Agents"
        description="Turn your cold list into booked appointments. NoFluff's AI voice agent calls your dead real-estate and mortgage leads 24/7 using your name. $0 setup, 7-day free trial."
        path="/dead-database"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-texas-glow" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-texas-500/30 bg-texas-500/10 px-4 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-texas-500 pulse-dot" />
            <span className="text-[11px] font-display tracking-[0.25em] text-texas-400">
              AI VOICE · 24/7 OUTBOUND
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[88px] mb-6 text-balance">
            Your dead leads <span className="text-texas-500">aren't dead.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-200 leading-relaxed max-w-2xl mx-auto mb-9">
            We deploy an AI voice agent that calls your aged list in your own
            voice, with your own name. It handles objections, qualifies
            interest, and books appointments while you sleep.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <a href="#pricing">
                Start Your Free Trial <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how">How it works</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-400">
            $0 setup · 7-day free trial · Cancel any time
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-28 border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              HOW IT WORKS
            </p>
            <h2 className="text-4xl md:text-5xl text-balance">
              From CSV to booked appointment in 72 hours.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/8 bg-ink-900/60 p-6 relative"
              >
                <div className="absolute top-4 right-5 font-display text-5xl text-texas-500/20">
                  0{i + 1}
                </div>
                <div className="flex size-12 items-center justify-center rounded-lg bg-texas-500/15 text-texas-500 mb-4">
                  <s.icon className="size-5" />
                </div>
                <h3 className="text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-ink-300 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ROICalculator ctaLabel="See Pricing" ctaHref="#pricing" />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              PRICING
            </p>
            <h2 className="text-4xl md:text-5xl mb-4 text-balance">
              Pick a volume. We'll do the calling.
            </h2>
            <p className="text-ink-300">
              $0 setup · 7-day free trial · Month-to-month
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "relative rounded-2xl p-8 flex flex-col border backdrop-blur-sm",
                  p.highlight
                    ? "border-texas-500/60 bg-gradient-to-b from-texas-500/10 to-ink-900/70 md:-translate-y-3 shadow-[0_30px_80px_-40px_rgba(224,90,26,0.5)]"
                    : "border-white/8 bg-ink-900/60"
                )}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-texas-500 px-4 py-1 text-[10px] font-display tracking-[0.2em] text-white">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-3xl mb-1">{p.name}</h3>
                <p className="text-sm text-ink-300 mb-6">{p.calls}</p>
                <div className="mb-6">
                  <span className="font-display text-5xl text-white tabular-nums">
                    ${p.price}
                  </span>
                  <span className="text-ink-300 text-sm">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
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
                  variant={p.highlight ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  <a href="#contact">Start Your Free Trial</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-5 text-balance">
            The list is already on your laptop. <br />
            <span className="text-texas-500">Let's wake it up.</span>
          </h2>
          <p className="text-ink-300 mb-8">
            Seven-day free trial. If the AI doesn't book you an appointment,
            you don't pay a dime.
          </p>
          <Button asChild size="lg">
            <a href="mailto:info@dfwhome.loans?subject=Dead%20Database%20Free%20Trial">
              Start Your Free Trial
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
