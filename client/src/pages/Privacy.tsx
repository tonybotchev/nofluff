import { SEOHead } from "@/components/SEOHead";
import { breadcrumbList, EMAIL, LEGAL_NAME } from "@/lib/schema";

const EFFECTIVE = "April 21, 2026";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="NoFluff Marketing privacy policy. How we collect, use, and protect your information."
        path="/privacy"
        jsonLd={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />

      <section className="pt-36 pb-16 md:pt-44 md:pb-20 border-b border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p className="text-sm font-display tracking-[0.25em] text-texas-500 mb-3">
            LEGAL
          </p>
          <h1 className="text-5xl md:text-6xl mb-4">Privacy Policy</h1>
          <p className="text-sm text-ink-400">Effective: {EFFECTIVE}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8 space-y-8 text-ink-200 leading-relaxed">
          <Block title="1. Who we are">
            {LEGAL_NAME} (“NoFluff Marketing,” “we,” “us”) is a Texas-based
            marketing and SaaS company located in Celina, TX. Questions about
            this policy can be directed to{" "}
            <a href={`mailto:${EMAIL}`} className="text-texas-500 hover:underline">
              {EMAIL}
            </a>
            .
          </Block>

          <Block title="2. Information we collect">
            We collect (a) information you provide directly — name, email,
            phone, company, billing details; (b) information about your use of
            the Service — IP address, device type, pages viewed, referring
            URL; and (c) information from integrations you connect (e.g., CRM
            data, call logs).
          </Block>

          <Block title="3. How we use it">
            To deliver and improve the Service, process payments, communicate
            with you, prevent fraud, comply with legal obligations, and —
            with your consent — send marketing you asked to receive. We do
            not sell your personal information.
          </Block>

          <Block title="4. Sharing">
            We share data only with (a) service providers under contract
            (hosting, payments, analytics, telephony), (b) parties you
            explicitly direct us to (e.g., integrations you enable), and (c)
            authorities when legally required.
          </Block>

          <Block title="5. Your choices">
            You can access, correct, or delete your data at any time by
            emailing{" "}
            <a href={`mailto:${EMAIL}`} className="text-texas-500 hover:underline">
              {EMAIL}
            </a>
            . You can unsubscribe from marketing via any email footer. Texas
            residents may have additional rights under applicable state law.
          </Block>

          <Block title="6. Communication consent (TCPA)">
            By providing your phone number, you consent to receive calls and
            SMS related to the services you requested, including messages
            delivered by AI voice agents. Message and data rates may apply.
            Reply STOP to opt out.
          </Block>

          <Block title="7. Cookies">
            We use first-party cookies for authentication and essential site
            function, and limited third-party cookies for analytics. You can
            disable cookies in your browser; some features may not work.
          </Block>

          <Block title="8. Security">
            We use reasonable administrative, technical, and physical
            safeguards. No system is perfectly secure; you use the Service at
            your own risk.
          </Block>

          <Block title="9. Children">
            The Service is not directed to children under 16 and we do not
            knowingly collect their data.
          </Block>

          <Block title="10. Changes">
            We may update this policy. Material changes will be announced by
            email or in-product notice at least 14 days before taking effect.
          </Block>

          <Block title="11. Contact">
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
