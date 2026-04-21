import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PhoneOff, TrendingDown } from "lucide-react";

const AVG_JOB_VALUE = 500;
const WEEKS_PER_MONTH = 4.33;

interface ROICalculatorProps {
  ctaHref?: string;
  ctaLabel?: string;
}

export function ROICalculator({
  ctaHref = "#pricing",
  ctaLabel = "Stop Losing Money",
}: ROICalculatorProps) {
  const [missedPerWeek, setMissedPerWeek] = useState(6);

  const { weekly, monthly, yearly } = useMemo(() => {
    const w = missedPerWeek * AVG_JOB_VALUE;
    const m = Math.round(w * WEEKS_PER_MONTH);
    const y = m * 12;
    return { weekly: w, monthly: m, yearly: y };
  }, [missedPerWeek]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="rounded-2xl border border-white/8 bg-ink-900/70 p-8 md:p-10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-11 items-center justify-center rounded-lg bg-texas-500/15 text-texas-500">
          <PhoneOff className="size-5" />
        </div>
        <div>
          <p className="text-xs font-display tracking-[0.2em] text-texas-500">
            ROI CALCULATOR
          </p>
          <h3 className="text-2xl md:text-3xl">What dead leads cost you</h3>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-end justify-between mb-4">
          <label
            htmlFor="missed-calls"
            className="text-sm text-ink-200 font-medium"
          >
            Missed or ignored calls per week
          </label>
          <span className="font-display text-4xl text-white tabular-nums">
            {missedPerWeek}
          </span>
        </div>
        <Slider
          id="missed-calls"
          min={1}
          max={20}
          step={1}
          value={[missedPerWeek]}
          onValueChange={(v) => setMissedPerWeek(v[0] ?? 1)}
          aria-label="Missed calls per week"
        />
        <div className="flex justify-between mt-2 text-xs text-ink-400 font-medium">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <Stat label="Per week" value={fmt(weekly)} />
        <Stat label="Per month" value={fmt(monthly)} highlight />
        <Stat label="Per year" value={fmt(yearly)} />
      </div>

      <p className="text-sm text-ink-300 leading-relaxed mb-6 flex items-start gap-2">
        <TrendingDown className="size-4 text-texas-500 mt-0.5 shrink-0" />
        Assuming an average deal value of{" "}
        <span className="text-white font-semibold">${AVG_JOB_VALUE}</span>. Most
        DFW agents we talk to lose 10x more than this in closed deals that never
        get a callback.
      </p>

      <Button asChild size="lg" className="w-full sm:w-auto">
        <a href={ctaHref}>{ctaLabel}</a>
      </Button>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-lg border px-3 py-4 md:px-4 md:py-5 " +
        (highlight
          ? "border-texas-500/50 bg-texas-500/10"
          : "border-white/8 bg-ink-800/60")
      }
    >
      <p className="text-[10px] md:text-xs font-display tracking-[0.15em] text-ink-300 mb-1">
        {label}
      </p>
      <p
        className={
          "font-display text-xl md:text-3xl tabular-nums " +
          (highlight ? "text-texas-400" : "text-white")
        }
      >
        {value}
      </p>
    </div>
  );
}
