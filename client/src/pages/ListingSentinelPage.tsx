import {
  Radar,
  FileSearch,
  Gavel,
  DollarSign,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { SentinelDashboard } from "@/components/SentinelDashboard";
import {
  breadcrumbList,
  serviceListingSentinel,
  SITE_URL,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

const SIGNALS = [
  {
    icon: Gavel,
    title: "Probate & estate filings",
    body: "Inherited property often sells within 90 days. We catch the filing on day one.",
  },
  {
    icon: FileSearch,
    title: "Divorce & partition actions",
    body: "Dallas, Collin, Denton, and Tarrant county court filings — before a listing agent is hired.",
  },
  {
    icon: DollarSign,
    title: "Tax delinquency & pre-foreclosure",
    body: "Homeowners under financial pressure are 4x more likely to entertain a direct offer.",
  },
  {
    icon: Clock,
    title: "Expired & withdrawn listings",
    body: "Cross-referenced with MLS history. Hit them right when motivation peaks.",
  },
];

const PLANS = [
  {
    name: "Watch",
    price: 0,
    tagline: "Waitlist — early access for DFW agents.",
    features: [
      "3 zip codes",
      "Weekly email digest",
      "10 alerts/mo",
      "Community Slack access",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:info@dfwhome.loans?subject=Sentinel%20Watch%20Waitlist",
  },
  {
    name: "Signal",
    price: 97,
    tagline: "For the agent working a focused farm.",
    highlight: true,
    features: [
      "10 zip codes",
      "Daily alerts (email + SMS)",
      "100 alerts/mo",
      "Probate & divorce filings",
      "Tax delinquency data",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:info@dfwhome.loans?subject=Sentinel%20Signal%20Waitlist",
  },
  {
    name: "Command",
    price: 197,
    tagline: "For the operator scaling across DFW.",
    features: [
      "Unlimited DFW zip codes",
      "Real-time push alerts",
      "Unlimited monthly alerts",
      "API + CRM integration",
      "Skip-trace on every alert",
      "Dedicated onboarding",
    ],
    cta: "Join Waitlist",
    ctaHref: "mailto:info@dfwhome.loans?subject=Sentinel%20Command%20Waitlist",
  },
];

export default function ListingSentinelPage() {
  const jsonLd = [
    serviceListingSentinel,
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Listing Sentinel", path: "/listing-sentinel" },
    ]),
  ];

  return (
    <>
      <SEOHead
        title="ListingSentinel AI | Pre-MLS DFW Property Intelligence"
        description="AI-powered public-records monitoring across Dallas, Collin, Denton, and Tarrant counties. Identify likely sellers before they list. Join the DFW waitlist."
        path="/listing-sentinel"
        jsonLd={jsonLd}
        image={`${SITE_URL}/logo-dark.svg`}
      />

      {/* HERO */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-texas-glow" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-texas-500/30 bg-texas-500/10 px-4 py-1.5 mb-7">
              <Radar className="size-4 text-texas-500" />
              <span className="text-[11px] font-display tracking-[0.25em] text-texas-400">
                DFW PROPERTY INTELLIGENCE
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 text-balance">
              See the listing <span className="text-texas-500">before it hits the MLS.</span>
            </h1>
            <p className="text-lg text-ink-200 leading-relaxed max-w-xl mb-8">
              ListingSentinel AI monitors public records, court filings, and
              tax data across Dallas, Collin, Denton, and Tarrant counties —
              surfacing likely-to-list properties 30 to 90 days before they go
              live.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#pricing">Join Waitlist</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#signals">See data sources</a>
              </Button>
            </div>
          </div>
          <div>
            <SentinelDashboard />
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section id="signals" className="py-20 md:py-28 border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              SIGNAL SOURCES
            </p>
            <h2 className="text-4xl md:text-5xl mb-5 text-balance">
              The four public-record signals that predict a sale.
            </h2>
            <p className="text-ink-300 leading-relaxed">
              We scrape, normalize, and cross-reference DFW county data daily —
              then run an ML model trained on every North Texas sale since 2018.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {SIGNALS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/8 bg-ink-900/60 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-texas-500/15 text-texas-500 shrink-0">
                    <s.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{s.title}</h3>
                    <p className="text-sm text-ink-300 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              WAITLIST PRICING
            </p>
            <h2 className="text-4xl md:text-5xl mb-4 text-balance">
              Launch pricing for DFW early adopters.
            </h2>
            <p className="text-ink-300">
              Locked for your lifetime as a customer. First 50 waitlist slots
              only.
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
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-3xl mb-1">{p.name}</h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-6">
                  {p.tagline}
                </p>
                <div className="mb-6">
                  <span className="font-display text-5xl text-white tabular-nums">
                    ${p.price}
                  </span>
                  {p.price > 0 && (
                    <span className="text-ink-300 text-sm">/mo</span>
                  )}
                  {p.price === 0 && (
                    <span className="text-texas-500 text-sm font-display tracking-wider ml-2">
                      FREE
                    </span>
                  )}
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
                  <a href={p.ctaHref}>{p.cta}</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
