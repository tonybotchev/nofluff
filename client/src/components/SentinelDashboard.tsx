import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Activity, Bell, MapPin } from "lucide-react";

const BASE_MONITORED = 47293;
const BASE_ALERTS = 23;
const HOT_ZIPS = ["75009", "75034", "75035"];

export function SentinelDashboard() {
  const [monitored, setMonitored] = useState(BASE_MONITORED);
  const [alerts, setAlerts] = useState(BASE_ALERTS);

  useEffect(() => {
    const id = setInterval(() => {
      setMonitored((m) => m + Math.floor(Math.random() * 7) + 1);
      setAlerts((a) => {
        const delta = Math.random() > 0.6 ? 1 : 0;
        return a + delta;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-ink-900/80 to-ink-950/80 p-6 md:p-8 backdrop-blur-sm overflow-hidden relative">
      <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-texas-500/10 blur-3xl" />

      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="relative size-2.5">
            <span className="absolute inset-0 rounded-full bg-green-500" />
            <span className="absolute inset-0 rounded-full bg-green-500 pulse-dot" />
          </div>
          <p className="text-xs font-display tracking-[0.2em] text-ink-200">
            LISTING SENTINEL · LIVE
          </p>
        </div>
        <p className="text-[10px] font-display tracking-[0.2em] text-ink-400">
          DFW METROPLEX
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <DashboardCard
          icon={<Activity className="size-4" />}
          label="Properties Monitored"
        >
          <AnimatedCounter
            end={monitored}
            duration={1500}
            className="font-display text-4xl md:text-5xl text-white tabular-nums"
          />
        </DashboardCard>

        <DashboardCard
          icon={<Bell className="size-4" />}
          label="Alerts This Week"
          accent
        >
          <span
            key={alerts}
            className="fade-up inline-block font-display text-4xl md:text-5xl text-texas-400 tabular-nums"
          >
            {alerts}
          </span>
        </DashboardCard>
      </div>

      <div className="rounded-lg border border-white/8 bg-ink-800/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="size-4 text-texas-500" />
          <p className="text-xs font-display tracking-[0.2em] text-ink-200">
            HOT ZIP CODES
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {HOT_ZIPS.map((zip) => (
            <span
              key={zip}
              className="rounded-md border border-texas-500/30 bg-texas-500/10 px-3 py-1.5 font-display text-sm tracking-wider text-texas-400"
            >
              {zip}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] text-ink-400 leading-relaxed">
        Simulated preview. Live dashboard updates every 60 seconds from Dallas,
        Collin, Denton & Tarrant county public records.
      </p>
    </div>
  );
}

function DashboardCard({
  icon,
  label,
  children,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-lg border p-5 " +
        (accent
          ? "border-texas-500/30 bg-texas-500/5"
          : "border-white/8 bg-ink-800/60")
      }
    >
      <div className="flex items-center gap-2 mb-3 text-ink-300">
        {icon}
        <p className="text-[11px] font-display tracking-[0.2em]">{label}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
