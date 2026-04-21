import { SEOHead } from "@/components/SEOHead";
import { breadcrumbList, EMAIL, LEGAL_NAME } from "@/lib/schema";

const EFFECTIVE = "April 21, 2026";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="NoFluff Marketing terms of service — subscription, use, and liability."
        path="/terms"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 border-b border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
            LEGAL
          </p>
          <h1 className="text-5xl md:text-6xl mb-4">Terms of Service</h1>
          <p className="text-sm text-ink-400">Effective: {EFFECTIVE}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8 space-y-8 text-ink-200 leading-relaxed">
          <Block title="1. Agreement">
            These Terms of Service (“Terms”) are a legal agreement between you
            and {LEGAL_NAME} (“we,” “us”). By using our website, software, or
            services (collectively, the “Service”) you agree to these Terms.
          </Block>

          <Block title="2. Eligibility">
            You must be at least 18 years old and authorized to bind the
            business you represent.
          </Block>

          <Block title="3. Subscription & billing">
            Paid plans are billed monthly in advance unless you selected an
            annual plan. Fees are non-refundable except where required by law.
            You can cancel at any time; cancellation takes effect at the end
            of the current billing period.
          </Block>

          <Block title="4. Free trial">
            Where offered, a free trial is provided once per customer. We may
            cancel or modify trials at our discretion.
          </Block>

          <Block title="5. Acceptable use">
            You will not (a) use the Service for spam, TCPA-violating calls,
            or unlawful telemarketing; (b) reverse engineer or resell the
            Service; (c) upload lists you are not authorized to contact; or
            (d) impersonate another person. You are solely responsible for
            consent and compliance for the contacts you load.
          </Block>

          <Block title="6. AI-generated communications">
            The Service may place AI-generated calls or messages on your
            behalf using voice clones or scripts you approve. You represent
            and warrant that you have appropriate consent to contact each
            recipient and that all communications comply with the TCPA,
            state-level telemarketing laws, and industry regulations.
          </Block>

          <Block title="7. Data">
            You retain ownership of data you upload. You grant us a limited
            license to process that data solely to provide the Service.
          </Block>

          <Block title="8. Licensing disclosures">
            Certain content, including educational materials about mortgages
            or home finance, is provided by Tony Botchev, NMLS #114198,
            sponsored by Loan Factory, Inc., NMLS #320841, Equal Housing
            Lender. Nothing on the Service is an offer to lend or a guarantee
            of loan approval.
          </Block>

          <Block title="9. Warranty disclaimer">
            The Service is provided “as is.” We disclaim all warranties,
            express or implied, including merchantability, fitness for a
            particular purpose, and non-infringement.
          </Block>

          <Block title="10. Limitation of liability">
            To the maximum extent permitted by law, our aggregate liability
            for any claim is limited to the fees paid by you in the 12 months
            preceding the event giving rise to the claim. We are not liable
            for indirect, incidental, or consequential damages.
          </Block>

          <Block title="11. Indemnity">
            You will indemnify and hold us harmless from any claim arising
            out of your use of the Service, your content, or your violation
            of these Terms.
          </Block>

          <Block title="12. Governing law">
            These Terms are governed by the laws of the State of Texas,
            excluding conflict-of-law rules. Disputes will be resolved in the
            state or federal courts located in Collin County, Texas.
          </Block>

          <Block title="13. Changes">
            We may update these Terms. Material changes will be announced by
            email or in-product notice. Continued use after the effective
            date constitutes acceptance.
          </Block>

          <Block title="14. Contact">
            {LEGAL_NAME} · Celina, TX 75009 · {EMAIL}
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl mb-3">{title}</h2>
      <p className="text-ink-200">{children}</p>
    </div>
  );
}
