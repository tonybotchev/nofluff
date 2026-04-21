import { MapPin, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import {
  breadcrumbList,
  personSchema,
  PHONE,
  PHONE_DISPLAY,
  organizationSchema,
} from "@/lib/schema";

export default function About() {
  const jsonLd = [
    personSchema,
    organizationSchema,
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <>
      <SEOHead
        title="About Tony Botchev | NoFluff Marketing"
        description="NoFluff Marketing was built by Tony Botchev, a licensed DFW mortgage loan originator (NMLS #114198). Based in Celina, TX. Every system runs in his own business first."
        path="/about"
        jsonLd={jsonLd}
      />

      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-texas-glow" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-texas-500/30 bg-texas-500/10 px-4 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-texas-500 pulse-dot" />
            <span className="text-[11px] font-display tracking-[0.25em] text-texas-400">
              THE OPERATOR'S STORY
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 text-balance">
            Built by a practitioner. <br />
            <span className="text-texas-500">Not a guru.</span>
          </h1>
          <p className="text-lg text-ink-200 leading-relaxed max-w-2xl mx-auto">
            Most marketing agencies are run by marketers. NoFluff is run by an
            operator who closes loans in the same DFW market you're trying to
            work.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-y border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-ink-100 leading-relaxed mb-6">
              Tony Botchev is a licensed mortgage loan originator (NMLS{" "}
              <strong>#114198</strong>) who built NoFluff Marketing's AI systems
              for his own business first —{" "}
              <a
                href="https://dfwhome.loans"
                className="text-texas-500 hover:underline"
              >
                DFW Homes & Loans
              </a>
              .
            </p>
            <p className="text-lg text-ink-100 leading-relaxed mb-6">
              Every tool we sell — the CRM, the AI voice agent, ListingSentinel,
              the listing-reel workflow — was born out of a problem he hit in
              his own pipeline. The AI caller came from a dead database of
              2,300 leads he refused to let die. ListingSentinel came from
              watching competitors win listings he should have seen coming.
            </p>
            <p className="text-lg text-ink-100 leading-relaxed mb-6">
              NoFluff only exists because other DFW agents kept asking him how
              he was closing deals that looked cold on paper. Eventually the
              answer got long enough to become a product.
            </p>
            <p className="text-lg text-ink-100 leading-relaxed mb-10">
              Based in Celina, Texas. Serving the entire DFW metroplex. Always
              available by phone at{" "}
              <a
                href={`tel:${PHONE}`}
                className="text-texas-500 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <ValueCard
              icon={<MapPin className="size-5" />}
              title="DFW-based"
              body="Celina, TX. Licensed to originate loans in Texas."
            />
            <ValueCard
              icon={<ShieldCheck className="size-5" />}
              title="NMLS #114198"
              body="Sponsored by Loan Factory, Inc. NMLS #320841."
            />
            <ValueCard
              icon={<Zap className="size-5" />}
              title="Operator-built"
              body="Every system ships after it makes Tony money first."
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-6 text-balance">
            No fluff. <span className="text-texas-500">Just results.</span>
          </h2>
          <p className="text-ink-300 mb-8 leading-relaxed">
            If that sounds different than the last five "marketing" calls you
            took, let's talk.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <a href={`tel:${PHONE}`}>Call {PHONE_DISPLAY}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:info@dfwhome.loans">Email Tony</a>
            </Button>
          </div>
          <div className="mt-12 rounded-lg border border-white/5 bg-ink-900/60 p-5 text-left">
            <p className="text-xs text-ink-300 leading-relaxed">
              <span className="font-display tracking-[0.15em] text-ink-100 block mb-1">
                NMLS DISCLOSURE
              </span>
              Tony Botchev NMLS #114198 | Sponsored by Loan Factory, Inc. NMLS
              #320841 | Equal Housing Lender. This website is for marketing and
              educational purposes only and does not constitute an offer to
              lend. All loan products subject to credit approval and program
              guidelines.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-ink-900/60 p-5">
      <div className="flex size-10 items-center justify-center rounded-md bg-texas-500/15 text-texas-500 mb-3">
        {icon}
      </div>
      <p className="font-display text-lg tracking-wide text-white">{title}</p>
      <p className="text-sm text-ink-300 leading-relaxed mt-1">{body}</p>
    </div>
  );
}
