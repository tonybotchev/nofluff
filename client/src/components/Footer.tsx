import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EMAIL,
  LEGAL_NAME,
  PHONE,
  PHONE_DISPLAY,
  SITE_NAME,
} from "@/lib/schema";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <img
              src="/logo-dark.svg"
              alt={SITE_NAME}
              className="h-10 w-auto mb-4"
              width={200}
              height={40}
            />
            <p className="text-sm text-ink-300 leading-relaxed mb-6">
              AI-powered revenue systems built by a DFW practitioner — not a
              guru.
            </p>
            <Button asChild>
              <a href="#contact">Schedule a Demo</a>
            </Button>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.2em] text-texas-500 mb-4">
              SERVICES
            </p>
            <ul className="space-y-3 text-sm text-ink-200">
              <li>
                <Link to="/#services" className="hover:text-white">
                  SaaS CRM
                </Link>
              </li>
              <li>
                <Link to="/dead-database" className="hover:text-white">
                  Dead Database Reactivation
                </Link>
              </li>
              <li>
                <Link to="/listing-sentinel" className="hover:text-white">
                  ListingSentinel AI
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-white">
                  Answer Engine Optimization
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-white">
                  Listing Reels
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.2em] text-texas-500 mb-4">
              COMPANY
            </p>
            <ul className="space-y-3 text-sm text-ink-200">
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.2em] text-texas-500 mb-4">
              CONTACT
            </p>
            <ul className="space-y-3 text-sm text-ink-200">
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Phone className="size-4 text-texas-500" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Mail className="size-4 text-texas-500" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-texas-500 mt-0.5" />
                <span>Celina, TX 75009</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="rounded-lg border border-white/5 bg-ink-900/60 p-5 mb-6">
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-400">
            <p>
              © {year} {LEGAL_NAME}. All rights reserved.
            </p>
            <p className="font-display tracking-[0.2em] text-texas-500">
              NO FLUFF. JUST RESULTS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
