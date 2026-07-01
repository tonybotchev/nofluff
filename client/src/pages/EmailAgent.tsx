import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  MailOpen,
  Send,
  RefreshCw,
  Check,
  X,
  Edit3,
  Globe,
  AlertCircle,
  ChevronRight,
  Inbox,
  Tag,
  ExternalLink,
  Bot,
  Shield,
  Briefcase,
  Bell,
  Search,
  Calendar,
  Clock,
  Trash2,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type EmailCategory = "lead" | "client" | "domain" | "admin" | "newsletter" | "support" | "other";
type EmailStatus = "draft-ready" | "sent" | "no-reply" | "skipped";

type Email = {
  id: string;
  accountId: string;
  rawId: string;
  from: string;
  fromName: string;
  subject: string;
  snippet: string;
  body?: string;
  receivedAt: string;
  category: EmailCategory;
  status: EmailStatus;
  priority: "high" | "medium" | "low";
  draft?: string;
  webLink?: string;
  sentAt?: string;
  processedAt?: string;
};

type CalendarEvent = {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  location?: { displayName?: string };
  organizer?: { emailAddress?: { name?: string } };
  isOnlineMeeting?: boolean;
  onlineMeetingUrl?: string;
  bodyPreview?: string;
};

type AgentState = {
  emails: Email[];
  calendar: CalendarEvent[];
  lastRun: string | null;
  error: string | null;
  agentRunning: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<EmailCategory, { label: string; color: string; icon: React.ElementType }> = {
  lead:       { label: "Lead",       color: "text-texas-500 bg-texas-500/10 border-texas-500/20",  icon: Briefcase },
  client:     { label: "Client",     color: "text-blue-400 bg-blue-400/10 border-blue-400/20",     icon: MailOpen  },
  domain:     { label: "Domain",     color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: Globe   },
  admin:      { label: "Admin",      color: "text-ink-200 bg-white/5 border-white/10",             icon: Shield    },
  newsletter: { label: "Newsletter", color: "text-ink-200 bg-white/5 border-white/10",             icon: Bell      },
  support:    { label: "Support",    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: AlertCircle },
  other:      { label: "Other",      color: "text-ink-200 bg-white/5 border-white/10",             icon: Tag       },
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor(diff / 60_000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

function formatEventTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: EmailCategory }) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border font-medium", meta.color)}>
      <Icon className="size-3" />
      {meta.label}
    </span>
  );
}

function PriorityDot({ priority }: { priority: Email["priority"] }) {
  return (
    <span className={cn("size-2 rounded-full flex-shrink-0 mt-1", {
      "bg-texas-500": priority === "high",
      "bg-yellow-400": priority === "medium",
      "bg-ink-200/30": priority === "low",
    })} />
  );
}

// ─── Email List ───────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: "all",         label: "All",    icon: Inbox     },
  { key: "draft-ready", label: "Drafts", icon: Edit3     },
  { key: "leads",       label: "Leads",  icon: Briefcase },
  { key: "sent",        label: "Sent",   icon: Send      },
] as const;

function EmailList({
  emails,
  selected,
  onSelect,
  filter,
}: {
  emails: Email[];
  selected: string | null;
  onSelect: (id: string) => void;
  filter: string;
}) {
  const visible = emails.filter((e) => {
    if (filter === "draft-ready") return e.status === "draft-ready";
    if (filter === "leads")       return e.category === "lead";
    if (filter === "sent")        return e.status === "sent";
    return true;
  });

  if (visible.length === 0) {
    return <div className="py-12 text-center text-ink-200 text-sm">No emails here</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-white/5">
      {visible.map((email) => (
        <button
          key={email.id}
          onClick={() => onSelect(email.id)}
          className={cn(
            "w-full text-left px-4 py-3 hover:bg-white/5 transition-colors group",
            selected === email.id && "bg-white/5 border-l-2 border-texas-500"
          )}
        >
          <div className="flex items-start gap-3">
            <PriorityDot priority={email.priority} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-sm font-medium text-white truncate">{email.fromName}</span>
                <span className="text-xs text-ink-200 flex-shrink-0">{relativeTime(email.receivedAt)}</span>
              </div>
              <div className="text-xs text-ink-200 truncate mb-1">{email.subject}</div>
              <div className="flex items-center gap-2">
                <CategoryBadge category={email.category} />
                {email.status === "draft-ready" && (
                  <span className="text-xs text-blue-400 flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-blue-400" />
                    Draft ready
                  </span>
                )}
                {email.status === "sent" && (
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-green-400" />
                    Sent
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="size-4 text-ink-200/40 group-hover:text-ink-200 transition-colors flex-shrink-0 mt-0.5" />
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Thread Viewer ────────────────────────────────────────────────────────────

function ThreadViewer({
  email,
  onApprove,
  onSkip,
  onRedraft,
}: {
  email: Email;
  onApprove: (id: string, draft: string) => void;
  onSkip: (id: string) => void;
  onRedraft: (id: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [draftText, setDraftText] = useState(email.draft ?? "");
  const [redrafting, setRedrafting] = useState(false);

  useEffect(() => {
    setDraftText(email.draft ?? "");
    setEditMode(false);
  }, [email.id, email.draft]);

  const catMeta = CATEGORY_META[email.category];
  const CatIcon = catMeta.icon;

  const handleRedraft = async () => {
    setRedrafting(true);
    await onRedraft(email.id);
    setRedrafting(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-white leading-snug">{email.subject}</h3>
          {email.webLink && (
            <a href={email.webLink} target="_blank" rel="noopener noreferrer"
               className="flex-shrink-0 text-ink-200 hover:text-white transition-colors">
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-ink-200">
          <span className="font-medium text-white">{email.fromName}</span>
          <span>{email.from}</span>
          <span>·</span>
          <span>{new Date(email.receivedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><CatIcon className="size-3" />{catMeta.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div
          className="text-sm text-ink-200 leading-relaxed bg-white/3 rounded-lg p-4 border border-white/5 max-h-60 overflow-y-auto"
          dangerouslySetInnerHTML={
            email.body?.includes("<") ? { __html: email.body } : undefined
          }
        >
          {!email.body?.includes("<") && (email.body ?? email.snippet)}
        </div>
      </div>

      {/* Draft panel */}
      {email.status === "draft-ready" && (
        <div className="border-t border-white/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="size-4 text-texas-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-texas-500">AI Draft Reply</span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleRedraft}
                disabled={redrafting}
                className="text-xs text-ink-200 hover:text-white flex items-center gap-1 transition-colors"
              >
                {redrafting
                  ? <><RefreshCw className="size-3 animate-spin" /> Regenerating…</>
                  : <><Sparkles className="size-3" /> Regenerate</>
                }
              </button>
              <button
                onClick={() => setEditMode((v) => !v)}
                className="text-xs text-ink-200 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Edit3 className="size-3" />
                {editMode ? "Preview" : "Edit"}
              </button>
            </div>
          </div>

          {editMode ? (
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-texas-500/50"
            />
          ) : (
            <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 text-sm text-ink-200 leading-relaxed whitespace-pre-wrap max-h-44 overflow-y-auto">
              {draftText}
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 bg-texas-500 hover:bg-texas-500/90 text-white"
              onClick={() => onApprove(email.id, draftText)}
            >
              <Check className="size-4 mr-1.5" />
              Approve &amp; Send
            </Button>
            <button
              onClick={() => onSkip(email.id)}
              className="px-3 py-1.5 text-sm text-ink-200 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-md transition-colors"
              title="Skip / no reply"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {email.status === "no-reply" && (
        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-ink-200/60">
            <Check className="size-4 text-green-500/60" />
            Agent marked as no reply needed
          </div>
        </div>
      )}

      {email.status === "sent" && (
        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-green-400">
            <Send className="size-4" />
            Reply sent{email.sentAt ? ` · ${relativeTime(email.sentAt)}` : ""}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Calendar Panel ───────────────────────────────────────────────────────────

function CalendarPanel({ events, onDelete }: { events: CalendarEvent[]; onDelete: (id: string) => void }) {
  if (events.length === 0) {
    return (
      <div className="py-10 text-center text-ink-200 text-sm">
        No upcoming events in the next 14 days
      </div>
    );
  }
  return (
    <div className="divide-y divide-white/5">
      {events.map((ev) => (
        <div key={ev.id} className="px-5 py-4 flex items-start gap-4 hover:bg-white/3 transition-colors group">
          <div className="flex-shrink-0 text-center bg-white/5 rounded-lg px-3 py-2 min-w-[52px]">
            <div className="text-xs text-ink-200 uppercase">
              {new Date(ev.start.dateTime).toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-lg font-bold text-white leading-none">
              {new Date(ev.start.dateTime).getDate()}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate mb-0.5">{ev.subject}</div>
            <div className="text-xs text-ink-200 flex items-center gap-2">
              <Clock className="size-3 flex-shrink-0" />
              {formatEventTime(ev.start.dateTime)}
              {" — "}
              {new Date(ev.end.dateTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </div>
            {ev.location?.displayName && (
              <div className="text-xs text-ink-200/60 mt-0.5 truncate">{ev.location.displayName}</div>
            )}
            {ev.isOnlineMeeting && ev.onlineMeetingUrl && (
              <a href={ev.onlineMeetingUrl} target="_blank" rel="noopener noreferrer"
                 className="text-xs text-blue-400 hover:text-blue-300 mt-0.5 inline-flex items-center gap-1">
                <ExternalLink className="size-3" /> Join online
              </a>
            )}
          </div>
          <button
            onClick={() => onDelete(ev.id)}
            className="opacity-0 group-hover:opacity-100 text-ink-200/40 hover:text-red-400 transition-all"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const API = "/api";

export default function EmailAgent() {
  const [agentState, setAgentState] = useState<AgentState>({
    emails: [], calendar: [], lastRun: null, error: null, agentRunning: false,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [tab, setTab] = useState<"inbox" | "calendar">("inbox");
  const [searchQ, setSearchQ] = useState("");
  const [liveMode, setLiveMode] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch(`${API}/state`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setAgentState(data);
      setLiveMode(true);
    } catch {
      setLiveMode(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const t = setInterval(fetchState, 30_000);
    return () => clearInterval(t);
  }, [fetchState]);

  const handleRunAgent = async () => {
    setTriggering(true);
    try {
      await fetch(`${API}/run`, { method: "POST" });
      await new Promise((r) => setTimeout(r, 3000));
      await fetchState();
    } finally {
      setTriggering(false);
    }
  };

  const handleApprove = async (emailId: string, draft: string) => {
    try {
      await fetch(`${API}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, draft }),
      });
      await fetchState();
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  const handleSkip = async (emailId: string) => {
    await fetch(`${API}/skip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId }),
    });
    await fetchState();
  };

  const handleRedraft = async (emailId: string) => {
    const res = await fetch(`${API}/redraft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId }),
    });
    const data = await res.json();
    if (data.draft) {
      setAgentState((prev) => ({
        ...prev,
        emails: prev.emails.map((e) =>
          e.id === emailId ? { ...e, draft: data.draft } : e
        ),
      }));
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await fetch(`${API}/calendar/${eventId}`, { method: "DELETE" });
    setAgentState((prev) => ({
      ...prev,
      calendar: prev.calendar.filter((e) => e.id !== eventId),
    }));
  };

  const emails = agentState.emails.filter((e) =>
    searchQ
      ? e.subject.toLowerCase().includes(searchQ.toLowerCase()) ||
        e.fromName.toLowerCase().includes(searchQ.toLowerCase()) ||
        e.from.toLowerCase().includes(searchQ.toLowerCase())
      : true
  );

  const selectedEmail = agentState.emails.find((e) => e.id === selected) ?? null;
  const draftsCount = emails.filter((e) => e.status === "draft-ready").length;
  const leadsCount  = emails.filter((e) => e.category === "lead").length;

  return (
    <div className="min-h-screen bg-ink-950 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-texas-500 text-xs font-semibold uppercase tracking-[0.18em] mb-2">
            <Bot className="size-4" />
            Autonomous Agent
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-white">
            Email Agent
          </h1>
          <p className="mt-2 text-ink-200 max-w-xl">
            Reads every inbox, classifies emails with AI, drafts replies — you only click Approve.
          </p>
        </div>

        {/* Status bar */}
        <div className="rounded-xl border border-white/10 bg-white/3 px-5 py-4 mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={cn("size-2.5 rounded-full", liveMode ? "bg-green-500 animate-pulse" : "bg-red-500")} />
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                Email Agent
                {!liveMode && (
                  <span className="flex items-center gap-1 text-xs text-red-400 font-normal">
                    <WifiOff className="size-3" /> Agent offline
                  </span>
                )}
              </div>
              <div className="text-xs text-ink-200">
                {agentState.lastRun ? `Last run ${relativeTime(agentState.lastRun)}` : "Not yet run"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-1">
            {[
              { label: "Total",   value: emails.length,   color: "text-white"        },
              { label: "Drafts",  value: draftsCount,     color: "text-blue-400"     },
              { label: "Leads",   value: leadsCount,      color: "text-texas-500"    },
              { label: "Sent",    value: emails.filter((e) => e.status === "sent").length, color: "text-green-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <div className={cn("text-xl font-bold", color)}>{value}</div>
                <div className="text-xs text-ink-200">{label}</div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleRunAgent}
            disabled={triggering || agentState.agentRunning}
            className="bg-texas-500 hover:bg-texas-500/90 text-white"
          >
            {triggering || agentState.agentRunning ? (
              <><RefreshCw className="size-4 mr-2 animate-spin" />Running…</>
            ) : (
              <><RefreshCw className="size-4 mr-2" />Run Agent</>
            )}
          </Button>
        </div>

        {agentState.error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
            <AlertCircle className="size-4 flex-shrink-0" />
            {agentState.error}
          </div>
        )}

        {/* Tab switcher */}
        <div className="flex gap-1 mb-5 border-b border-white/10 pb-0">
          {[
            { key: "inbox" as const,    label: "Inbox",    icon: Mail      },
            { key: "calendar" as const, label: "Calendar", icon: Calendar  },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                tab === key
                  ? "text-texas-500 border-texas-500"
                  : "text-ink-200 border-transparent hover:text-white"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "inbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: email list */}
            <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/3 flex flex-col overflow-hidden">
              {/* Search */}
              <div className="p-3 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-ink-200/50" />
                  <input
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    placeholder="Search emails…"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-ink-200/40 focus:outline-none focus:border-texas-500/50"
                  />
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex border-b border-white/5 overflow-x-auto">
                {FILTER_TABS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors border-b-2",
                      filter === key ? "text-texas-500 border-texas-500" : "text-ink-200 border-transparent hover:text-white"
                    )}
                  >
                    <Icon className="size-3.5" />
                    {label}
                    {key === "draft-ready" && draftsCount > 0 && (
                      <span className="ml-1 bg-blue-400/20 text-blue-300 text-xs px-1.5 rounded-full">
                        {draftsCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto">
                {(triggering || agentState.agentRunning) ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <RefreshCw className="size-8 text-texas-500 animate-spin" />
                    <div className="text-center">
                      <div className="text-sm font-medium text-white mb-1">Agent Processing…</div>
                      <div className="text-xs text-ink-200">Reading inbox · Classifying · Drafting</div>
                    </div>
                  </div>
                ) : (
                  <EmailList
                    emails={emails}
                    selected={selected}
                    onSelect={setSelected}
                    filter={filter}
                  />
                )}
              </div>
            </div>

            {/* Right: thread viewer */}
            <div className="lg:col-span-3 rounded-xl border border-white/10 bg-white/3 min-h-[520px] flex flex-col">
              {selectedEmail ? (
                <ThreadViewer
                  email={selectedEmail}
                  onApprove={handleApprove}
                  onSkip={handleSkip}
                  onRedraft={handleRedraft}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-ink-200/50 py-16">
                  <MailOpen className="size-12" />
                  <div className="text-sm">Select an email to view</div>
                  {!liveMode && (
                    <div className="text-xs text-red-400/70 max-w-xs text-center mt-2">
                      Agent server is offline. Run <code className="bg-white/5 px-1 rounded">npm start</code> in <code className="bg-white/5 px-1 rounded">/server</code> to connect.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "calendar" && (
          <div className="rounded-xl border border-white/10 bg-white/3 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <Calendar className="size-4 text-texas-500" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Upcoming Events · Next 14 Days
              </h3>
              <span className="ml-auto text-xs text-ink-200">
                {agentState.calendar.length} events
              </span>
            </div>
            <CalendarPanel
              events={agentState.calendar}
              onDelete={handleDeleteEvent}
            />
          </div>
        )}

        {/* Setup instructions — shown when agent is offline */}
        {!liveMode && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="size-4 text-texas-500" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Start the Agent</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                { step: "1", title: "Configure credentials", desc: 'Copy server/.env.example → server/.env, fill in ANTHROPIC_API_KEY and OUTLOOK_ACCESS_TOKEN' },
                { step: "2", title: "Install & start", desc: 'cd server && npm install && npm start — runs on port 3001' },
                { step: "3", title: "Agent connects", desc: 'Dashboard auto-connects. Emails load, AI drafts generate, calendar syncs every 5 minutes.' },
              ].map((s) => (
                <div key={s.step} className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="size-6 rounded-full bg-texas-500/20 text-texas-500 text-xs font-bold flex items-center justify-center mb-2">{s.step}</div>
                  <div className="font-medium text-white mb-1 text-xs uppercase tracking-wider">{s.title}</div>
                  <div className="text-xs text-ink-200">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
