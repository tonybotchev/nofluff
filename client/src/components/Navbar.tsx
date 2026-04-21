import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PHONE, PHONE_DISPLAY } from "@/lib/schema";

const NAV_LINKS = [
  { to: "/#services", label: "Services" },
  { to: "/dead-database", label: "Dead Database" },
  { to: "/listing-sentinel", label: "Listing Sentinel" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5 backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-ink-950/90 py-2"
          : "bg-ink-950/60 py-3"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-md">
          <img
            src="/logo-dark.svg"
            alt="NoFluff Marketing"
            className="h-9 w-auto"
            width={180}
            height={36}
          />
          <span className="sr-only">NoFluff Marketing home</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.to.startsWith("/#") ? (
              <a
                key={link.to}
                href={link.to}
                className="text-sm font-medium uppercase tracking-[0.12em] text-ink-200 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium uppercase tracking-[0.12em] transition-colors hover:text-white",
                    isActive ? "text-white" : "text-ink-200"
                  )
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 text-sm font-medium text-ink-200 hover:text-texas-500 transition-colors"
          >
            <Phone className="size-4" />
            {PHONE_DISPLAY}
          </a>
          <Button asChild size="sm">
            <a href="#contact">Schedule a Demo</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 focus-ring"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-ink-950/98 backdrop-blur-xl border-t border-white/5 transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-6 gap-1">
          {NAV_LINKS.map((link) =>
            link.to.startsWith("/#") ? (
              <a
                key={link.to}
                href={link.to}
                className="py-4 text-2xl font-display tracking-wider uppercase text-white border-b border-white/5"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="py-4 text-2xl font-display tracking-wider uppercase text-white border-b border-white/5"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 text-ink-200"
            >
              <Phone className="size-4" />
              {PHONE_DISPLAY}
            </a>
            <Button asChild size="lg" className="w-full">
              <a href="#contact">Schedule a Demo</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
