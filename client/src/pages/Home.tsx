import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Sparkles,
  Film,
  Share2,
  Database,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { PricingToggle } from "@/components/PricingToggle";
import { ROICalculator } from "@/components/ROICalculator";
import {
  allPrimarySchemas,
  breadcrumbList,
  faqSchema,
  PHONE,
  PHONE_DISPLAY,
  productGrowth,
  productPro,
  productStarter,
  serviceAeo,
  serviceDeadDatabase,
  serviceListingReels,
  serviceSaasCrm,
  serviceSocialMedia,
} from "@/lib/schema";

const SERVICES = [
  {
    icon: Database,
    name: "SaaS CRM",
    href: "/#pricing",
    blurb:
      "A full AI-powered CRM built for real estate and mortgage — pipelines, campaigns, calendars, funnels, and a unified inbox.",
  },
  {
    icon: Phone,
    name: "Dead Database Reactivation",
    href: "/dead-database",
    blurb:
      "AI voice agents call your cold list 24/7 using your name. Appointments land on your calendar while you sleep.",
  },
  {
    icon: Sparkles,
    name: "Answer Engine Optimization",
    href: "/#services",
    blurb:
      "Get your business cited by ChatGPT, Claude, Perplexity, and Google AI Overviews — where your buyers actually ask questions.",
  },
  {
    icon: Film,
    name: "Listing Reels",
    href: "/#services",
    blurb:
      "30–45 second vertical listing videos from your MLS photos. No filming. 24-hour delivery. $97 each.",
  },
  {
    icon: Share2,
    name: "Social Media Management",
    href: "/#services",
    blurb:
      "Done-for-you content calendars, short-form video, and DM engagement so you can stop posting and start closing.",
  },
];

const STATS: Array<{
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  note?: string;
}> = [
  { end: 87, label: "Average dead-list conversion rate", suffix: "%", note: "within 30 days" },
  { end: 24, label: "Hour listing-reel turnaround", suffix: "hr" },
  { end: 7, label: "Day free trial on Dead Database Reactivation", note: "$0 setup" },
  { end: 97, label: "Per listing reel — no filming required", prefix: "$" },
];

export default function Home() {
  const jsonLd = [
    ...allPrimarySchemas,
    serviceSaasCrm,
    serviceDeadDatabase,
    serviceAeo,
    serviceListingReels,
    serviceSocialMedia,
    productStarter,
    productGrowth,
    productPro,
    faqSchema,
    breadcrumbList([{ name: "Home", path: "/" }]),
  ];

  return (
    <>
      <SEOHead
        title="AI Revenue Systems for DFW Real Estate & Mortgage"
        description="NoFluff Marketing builds AI-powered CRM, voice agents, and done-for-you content for DFW agents and loan officers. Built by a licensed practitioner, NMLS #114198. No fluff. Just results."
        path="/"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-texas-glow" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-[1.1fr_.9fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-texas-500/30 bg-texas-500/10 px-4 py-1.5 mb-7 fade-up">
              <span className="size-1.5 rounded-full bg-texas-500 pulse-dot" />
              <span className="text-[11px] font-display tracking-[0.25em] text-texas-400">
                BUILT BY A DFW PRACTITIONER · NMLS #114198
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] text-balance mb-6 fade-up">
              Your leads aren't dead.<br />
              <span className="text-texas-500">Your follow-up is.</span>
            </h1>
            <p className="text-lg text-ink-200 leading-relaxed max-w-xl mb-8 fade-up">
              NoFluff Marketing builds the AI-powered revenue systems DFW real
              estate agents and mortgage pros actually need — CRM, voice
              agents, and content that closes. No guru fluff. No vaporware.
              Just the operator's playbook.
            </p>
            <div className="flex flex-wrap gap-3 fade-up">
              <Button asChild size="lg">
                <a href="#pricing">
                  See Pricing <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">Schedule a Demo</a>
              </Button>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-texas-500 transition-colors"
            >
              <Phone className="size-4" />
              Or call {PHONE_DISPLAY}
            </a>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-texas-500/20 to-transparent blur-2xl" />
            <div className="relative rounded-2xl border border-white/8 bg-ink-900/70 p-6 backdrop-blur-sm">
              <p className="text-xs font-display tracking-[0.2em] text-texas-500 mb-5">
                BY THE NUMBERS · DFW
              </p>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-white/5 bg-ink-800/60 p-4"
                  >
                    <AnimatedCounter
                      end={s.end}
                      prefix={s.prefix ?? ""}
                      suffix={s.suffix ?? ""}
                      className="font-display text-3xl text-white tabular-nums block"
                    />
                    <p className="text-[11px] text-ink-300 mt-1 leading-tight">
                      {s.label}
                      {s.note && (
                        <span className="block text-ink-400">{s.note}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label + "-strip"}>
              <AnimatedCounter
                end={s.end}
                prefix={s.prefix ?? ""}
                suffix={s.suffix ?? ""}
                className="font-display text-4xl text-texas-500 tabular-nums"
              />
              <p className="text-xs text-ink-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              WHAT WE BUILD
            </p>
            <h2 className="text-4xl md:text-6xl mb-5 text-balance">
              Five systems. One operator's stack.
            </h2>
            <p className="text-lg text-ink-300 leading-relaxed">
              Every tool here runs in Tony's own DFW mortgage business first.
              If it doesn't make money for him, you'll never see it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, name, blurb, href }) => (
              <Link
                key={name}
                to={href}
                className="group rounded-2xl border border-white/8 bg-ink-900/60 p-7 hover:border-texas-500/40 hover:bg-ink-900 transition-all"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-texas-500/15 text-texas-500 mb-5">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-2xl mb-3">{name}</h3>
                <p className="text-sm text-ink-300 leading-relaxed mb-5">
                  {blurb}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-display tracking-[0.15em] text-texas-500 group-hover:gap-3 transition-all">
                  LEARN MORE <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-16 md:py-24 bg-ink-900/40 border-y border-white/5">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <ROICalculator />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
              PRICING
            </p>
            <h2 className="text-4xl md:text-6xl mb-5 text-balance">
              Real pricing. No sales calls required.
            </h2>
            <p className="text-lg text-ink-300 leading-relaxed">
              Month-to-month. Cancel any time. Annual saves 10%.
            </p>
          </div>
          <PricingToggle />
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-24 bg-ink-900/40 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl mb-10 text-balance">
            No fluff. <span className="text-texas-500">Just results.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Built by an operator",
                body: "Every system runs in Tony's own DFW mortgage business before it ships to clients.",
              },
              {
                title: "Month-to-month",
                body: "No annual contracts, no six-figure setup fees, no account managers who can't spell 'MLS'.",
              },
              {
                title: "DFW-first",
                body: "Celina-based. Scripts, data, and playbooks tuned to the North Texas market specifically.",
              },
            ].map((v) => (
              <div key={v.title} className="flex gap-3">
                <CheckCircle2 className="size-5 text-texas-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl mb-2">{v.title}</h3>
                  <p className="text-sm text-ink-300 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-texas-500/30 bg-texas-500/10 px-4 py-1.5 mb-6">
            <Bot className="size-4 text-texas-500" />
            <span className="text-[11px] font-display tracking-[0.25em] text-texas-400">
              READY WHEN YOU ARE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6 text-balance">
            Stop paying for fluff. <br />
            <span className="text-texas-500">Start closing leads.</span>
          </h2>
          <p className="text-lg text-ink-300 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a 20-minute demo. We'll show you the exact system Tony uses to
            convert dead DFW leads — or you'll leave with three ideas you can
            run yourself.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <a href={`tel:${PHONE}`}>Call {PHONE_DISPLAY}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:info@dfwhome.loans">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
