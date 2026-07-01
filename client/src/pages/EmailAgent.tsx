import { useState } from "react";
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
  Clock,
  Tag,
  ExternalLink,
  Bot,
  Shield,
  Briefcase,
  Bell,
  Trash2,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Account = {
  id: string;
  name: string;
  email: string;
  provider: "outlook" | "gmail";
  unread: number;
  connected: boolean;
};

type EmailCategory =
  | "lead"
  | "client"
  | "domain"
  | "admin"
  | "newsletter"
  | "support"
  | "other";

type EmailStatus = "unread" | "draft-ready" | "approved" | "no-reply";

type Email = {
  id: string;
  accountId: string;
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
};

type Domain = {
  name: string;
  status: "active" | "expiring" | "available" | "unknown";
  expires?: string;
};

// ─── Static seed data (mirrors live Outlook + Gmail inboxes) ─────────────────

const ACCOUNTS: Account[] = [
  {
    id: "outlook",
    name: "Tony Botchev",
    email: "tony@nofluffmarketing.onmicrosoft.com",
    provider: "outlook",
    unread: 5,
    connected: true,
  },
  {
    id: "gmail",
    name: "DFW Home Loans",
    email: "info@dfwhome.loans",
    provider: "gmail",
    unread: 0,
    connected: true,
  },
];

const INITIAL_EMAILS: Email[] = [
  {
    id: "1",
    accountId: "outlook",
    from: "msonlineservicesteam@microsoftonline.com",
    fromName: "Microsoft Online",
    subject: "Your NoFluff Marketing LLC password has been reset",
    snippet:
      "The password on your account has recently been reset. If you performed this password reset, then this message is for your information only.",
    receivedAt: "2026-06-30T01:51:27Z",
    category: "admin",
    status: "no-reply",
    priority: "low",
  },
  {
    id: "2",
    accountId: "outlook",
    from: "o365mc@microsoft.com",
    fromName: "Microsoft 365",
    subject: "Weekly digest: Microsoft service updates",
    snippet:
      "As a new admin to the Microsoft 365 admin center, you'll get weekly emails from the message center about upcoming changes to your services.",
    receivedAt: "2026-06-29T09:51:38Z",
    category: "newsletter",
    status: "no-reply",
    priority: "low",
  },
  {
    id: "3",
    accountId: "outlook",
    from: "MSSecurity-noreply@microsoft.com",
    fromName: "Microsoft Security",
    subject: "Security recommendation: Do not allow users to grant consent to unreliable applications",
    snippet:
      "You have a new recommendation for NoFluff Marketing LLC. See why this recommendation was generated for your tenant and how to remediate it.",
    receivedAt: "2026-06-22T00:36:14Z",
    category: "admin",
    status: "draft-ready",
    priority: "medium",
    draft:
      "Thank you for the security recommendation. I have reviewed the guidance regarding application consent policies and will implement the recommended restrictions in the Microsoft Entra admin center. This aligns with our security posture for NoFluff Marketing LLC.",
  },
  {
    id: "4",
    accountId: "outlook",
    from: "MSSecurity-noreply@microsoft.com",
    fromName: "Microsoft Security",
    subject: "Security recommendation: Designate more than one global admin",
    snippet:
      "You have a new recommendation for NoFluff Marketing LLC. Designate more than one global admin. See why this recommendation was generated.",
    receivedAt: "2026-06-22T00:36:14Z",
    category: "admin",
    status: "no-reply",
    priority: "medium",
  },
  {
    id: "5",
    accountId: "outlook",
    from: "MicrosoftExchange329e71ec88ae4615bbc36ab6ce41109e@nofluffmarketing.io",
    fromName: "Mail Delivery",
    subject: "Undeliverable: test — info@nofluffmarketing.io not found",
    snippet:
      "Your message to info@nofluffmarketing.io couldn't be delivered. info wasn't found at nofluffmarketing.io. The address may be misspelled.",
    receivedAt: "2026-06-19T01:57:19Z",
    category: "admin",
    status: "draft-ready",
    priority: "high",
    draft:
      "Action needed: The email address info@nofluffmarketing.io is not yet configured. Please set up the mailbox in Microsoft 365 admin center or update the MX records for nofluffmarketing.io to ensure email delivery works correctly for the domain.",
  },
];

const DOMAINS: Domain[] = [
  { name: "dfwhome.loans", status: "active", expires: "2027-03-15" },
  { name: "nofluffmarketing.io", status: "active", expires: "2027-01-22" },
  { name: "nofluffmarketing.onmicrosoft.com", status: "active" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  EmailCategory,
  { label: string; color: string; icon: React.ElementType }
> = {
  lead: { label: "Lead", color: "text-texas-500 bg-texas-500/10 border-texas-500/20", icon: Briefcase },
  client: { label: "Client", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: MailOpen },
  domain: { label: "Domain", color: "text-purple-400 bg-purple-400/10 border-purple-400/20", icon: Globe },
  admin: { label: "Admin", color: "text-ink-200 bg-white/5 border-white/10", icon: Shield },
  newsletter: { label: "Newsletter", color: "text-ink-200 bg-white/5 border-white/10", icon: Bell },
  support: { label: "Support", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: AlertCircle },
  other: { label: "Other", color: "text-ink-200 bg-white/5 border-white/10", icon: Tag },
};

const STATUS_META: Record<EmailStatus, { label: string; dot: string }> = {
  unread: { label: "Unread", dot: "bg-texas-500" },
  "draft-ready": { label: "Draft Ready", dot: "bg-blue-400" },
  approved: { label: "Sent", dot: "bg-green-500" },
  "no-reply": { label: "No Reply", dot: "bg-ink-200/40" },
};

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return `${m}m ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AccountBadge({ account }: { account: Account }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "size-2 rounded-full",
          account.connected ? "bg-green-500" : "bg-red-500"
        )}
      />
      <span className="text-xs text-ink-200 truncate max-w-[160px]">
        {account.email}
      </span>
      <span
        className={cn(
          "text-xs px-1.5 py-0.5 rounded font-mono",
          account.provider === "outlook"
            ? "bg-blue-600/20 text-blue-300"
            : "bg-red-600/20 text-red-300"
        )}
      >
        {account.provider === "outlook" ? "Outlook" : "Gmail"}
      </span>
    </div>
  );
}

function CategoryBadge({ category }: { category: EmailCategory }) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border font-medium",
        meta.color
      )}
    >
      <Icon className="size-3" />
      {meta.label}
    </span>
  );
}

function PriorityDot({ priority }: { priority: Email["priority"] }) {
  return (
    <span
      className={cn("size-2 rounded-full flex-shrink-0", {
        "bg-texas-500": priority === "high",
        "bg-yellow-400": priority === "medium",
        "bg-ink-200/30": priority === "low",
      })}
    />
  );
}

// ─── Email List ───────────────────────────────────────────────────────────────

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
    if (filter === "all") return true;
    if (filter === "draft-ready") return e.status === "draft-ready";
    if (filter === "unread") return e.status === "unread";
    if (filter === "leads") return e.category === "lead";
    return true;
  });

  return (
    <div className="flex flex-col divide-y divide-white/5">
      {visible.length === 0 && (
        <div className="py-12 text-center text-ink-200 text-sm">
          No emails in this view
        </div>
      )}
      {visible.map((email) => {
        const acc = ACCOUNTS.find((a) => a.id === email.accountId);
        return (
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
                  <span className="text-sm font-medium text-white truncate">
                    {email.fromName}
                  </span>
                  <span className="text-xs text-ink-200 flex-shrink-0">
                    {relativeTime(email.receivedAt)}
                  </span>
                </div>
                <div className="text-xs text-ink-200 truncate mb-1">
                  {email.subject}
                </div>
                <div className="flex items-center gap-2">
                  <CategoryBadge category={email.category} />
                  {email.status === "draft-ready" && (
                    <span className="text-xs text-blue-400 flex items-center gap-1">
                      <div className="size-1.5 rounded-full bg-blue-400" />
                      Draft ready
                    </span>
                  )}
                  {acc && (
                    <span className="text-xs text-ink-200/60 truncate">
                      {acc.email.split("@")[1]}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="size-4 text-ink-200/40 group-hover:text-ink-200 transition-colors flex-shrink-0 mt-0.5" />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Thread Viewer ────────────────────────────────────────────────────────────

function ThreadViewer({
  email,
  onApprove,
  onSkip,
  onEdit,
}: {
  email: Email;
  onApprove: (id: string) => void;
  onSkip: (id: string) => void;
  onEdit: (id: string, draft: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [draftText, setDraftText] = useState(email.draft ?? "");

  const acc = ACCOUNTS.find((a) => a.id === email.accountId);
  const catMeta = CATEGORY_META[email.category];
  const CatIcon = catMeta.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-white leading-snug">
            {email.subject}
          </h3>
          {email.webLink && (
            <a
              href={email.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-ink-200 hover:text-white transition-colors"
            >
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
          <span className="flex items-center gap-1">
            <CatIcon className="size-3" />
            {catMeta.label}
          </span>
          {acc && (
            <>
              <span>·</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded font-mono",
                  acc.provider === "outlook"
                    ? "bg-blue-600/20 text-blue-300"
                    : "bg-red-600/20 text-red-300"
                )}
              >
                {acc.provider === "outlook" ? "Outlook" : "Gmail"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="text-sm text-ink-200 leading-relaxed bg-white/3 rounded-lg p-4 border border-white/5">
          {email.body ?? email.snippet}
        </div>
      </div>

      {/* Draft reply */}
      {email.status === "draft-ready" && email.draft && (
        <div className="border-t border-white/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="size-4 text-texas-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-texas-500">
              AI Draft Reply
            </span>
            <span className="ml-auto">
              <button
                onClick={() => setEditMode((v) => !v)}
                className="text-xs text-ink-200 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Edit3 className="size-3" />
                {editMode ? "Preview" : "Edit"}
              </button>
            </span>
          </div>

          {editMode ? (
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-texas-500/50"
            />
          ) : (
            <div className="bg-white/5 border border-blue-400/20 rounded-lg p-4 text-sm text-ink-200 leading-relaxed">
              {draftText}
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 bg-texas-500 hover:bg-texas-500/90 text-white"
              onClick={() => {
                if (editMode) onEdit(email.id, draftText);
                onApprove(email.id);
              }}
            >
              <Check className="size-4 mr-1.5" />
              Approve & Send
            </Button>
            <button
              onClick={() => setEditMode(true)}
              className="px-3 py-1.5 text-sm text-ink-200 hover:text-white border border-white/10 hover:border-white/20 rounded-md transition-colors"
            >
              <Edit3 className="size-4" />
            </button>
            <button
              onClick={() => onSkip(email.id)}
              className="px-3 py-1.5 text-sm text-ink-200 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-md transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {email.status === "no-reply" && (
        <div className="border-t border-white/5 p-5">
          <div className="flex items-center gap-2 text-sm text-ink-200/60">
            <Check className="size-4 text-green-500/60" />
            Agent marked as no reply needed
          </div>
        </div>
      )}

      {email.status === "approved" && (
        <div className="border-t border-white/5 p-5">
          <div className="flex items-center gap-2 text-sm text-green-400">
            <Send className="size-4" />
            Reply sent
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Domain Manager ───────────────────────────────────────────────────────────

function DomainManager() {
  const [checking, setChecking] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<null | string>(null);

  const check = () => {
    if (!query.trim()) return;
    setChecking(true);
    setResults(null);
    setTimeout(() => {
      setChecking(false);
      setResults(`Check GoDaddy for "${query}" — domain availability result will appear here.`);
    }, 1200);
  };

  const statusColor = (s: Domain["status"]) =>
    ({
      active: "text-green-400",
      expiring: "text-yellow-400",
      available: "text-blue-400",
      unknown: "text-ink-200",
    }[s]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/3">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <Globe className="size-4 text-texas-500" />
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Domain Manager
        </h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {DOMAINS.map((d) => (
            <div
              key={d.name}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <div className="font-mono text-sm text-white mb-1">{d.name}</div>
              <div className={cn("text-xs capitalize", statusColor(d.status))}>
                {d.status}
                {d.expires && (
                  <span className="ml-1 text-ink-200/60">
                    · exp {new Date(d.expires).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="Check a new domain (e.g. dfwloans.com)"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-ink-200/50 focus:outline-none focus:border-texas-500/50"
          />
          <Button size="sm" onClick={check} disabled={checking}>
            {checking ? (
              <RefreshCw className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
          </Button>
        </div>
        {results && (
          <div className="mt-3 text-xs text-ink-200 bg-white/5 rounded-lg p-3 border border-white/10">
            {results}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Agent Status Bar ─────────────────────────────────────────────────────────

function AgentStatusBar({
  emails,
  running,
  onRun,
  lastRun,
}: {
  emails: Email[];
  running: boolean;
  onRun: () => void;
  lastRun: string | null;
}) {
  const unread = emails.filter((e) => e.status === "unread").length;
  const drafts = emails.filter((e) => e.status === "draft-ready").length;
  const approved = emails.filter((e) => e.status === "approved").length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/3 px-5 py-4 flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <Bot className="size-5 text-texas-500" />
        <div>
          <div className="text-sm font-semibold text-white">Email Agent</div>
          <div className="text-xs text-ink-200">
            {lastRun ? `Last run ${relativeTime(lastRun)}` : "Not yet run"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 flex-1">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{emails.length}</div>
          <div className="text-xs text-ink-200">Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-texas-500">{unread + drafts}</div>
          <div className="text-xs text-ink-200">Needs Action</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-400">{drafts}</div>
          <div className="text-xs text-ink-200">Drafts Ready</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">{approved}</div>
          <div className="text-xs text-ink-200">Sent</div>
        </div>
      </div>

      <Button
        onClick={onRun}
        disabled={running}
        className="bg-texas-500 hover:bg-texas-500/90 text-white"
      >
        {running ? (
          <>
            <RefreshCw className="size-4 mr-2 animate-spin" />
            Running…
          </>
        ) : (
          <>
            <RefreshCw className="size-4 mr-2" />
            Run Agent
          </>
        )}
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: "all", label: "All", icon: Inbox },
  { key: "draft-ready", label: "Drafts", icon: Edit3 },
  { key: "unread", label: "Unread", icon: Mail },
  { key: "leads", label: "Leads", icon: Briefcase },
] as const;

export default function EmailAgent() {
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [agentRunning, setAgentRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<string>("all");

  const visibleEmails = emails.filter(
    (e) => activeAccount === "all" || e.accountId === activeAccount
  );

  const selectedEmail = emails.find((e) => e.id === selected) ?? null;

  const handleApprove = (id: string) =>
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "approved" as const } : e))
    );

  const handleSkip = (id: string) =>
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "no-reply" as const } : e))
    );

  const handleEdit = (id: string, draft: string) =>
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, draft } : e))
    );

  const handleRunAgent = () => {
    setAgentRunning(true);
    setTimeout(() => {
      setAgentRunning(false);
      setLastRun(new Date().toISOString());
      setEmails((prev) =>
        prev.map((e) =>
          e.status === "unread" ? { ...e, status: "draft-ready" as const } : e
        )
      );
    }, 2800);
  };

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
            Reads every inbox, classifies emails, drafts replies — you only click Approve.
          </p>
        </div>

        {/* Connected accounts */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveAccount("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
              activeAccount === "all"
                ? "bg-texas-500/10 border-texas-500/40 text-texas-500"
                : "bg-white/3 border-white/10 text-ink-200 hover:text-white"
            )}
          >
            All Accounts
          </button>
          {ACCOUNTS.map((acc) => (
            <button
              key={acc.id}
              onClick={() => setActiveAccount(acc.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors flex items-center gap-2",
                activeAccount === acc.id
                  ? "bg-texas-500/10 border-texas-500/40 text-texas-500"
                  : "bg-white/3 border-white/10 text-ink-200 hover:text-white"
              )}
            >
              <div className="size-2 rounded-full bg-green-500" />
              <span className="truncate max-w-[180px]">{acc.email}</span>
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded font-mono",
                  acc.provider === "outlook"
                    ? "bg-blue-600/20 text-blue-300"
                    : "bg-red-600/20 text-red-300"
                )}
              >
                {acc.provider === "outlook" ? "OL" : "GM"}
              </span>
              {acc.unread > 0 && (
                <span className="size-4 text-xs bg-texas-500 text-white rounded-full flex items-center justify-center font-bold">
                  {acc.unread}
                </span>
              )}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-sm text-ink-200 hover:text-white hover:border-white/40 transition-colors">
            + Add Account
          </button>
        </div>

        {/* Agent status bar */}
        <div className="mb-6">
          <AgentStatusBar
            emails={visibleEmails}
            running={agentRunning}
            onRun={handleRunAgent}
            lastRun={lastRun}
          />
        </div>

        {/* Main layout: list + thread viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Email list */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/3 flex flex-col overflow-hidden">
            {/* Filter tabs */}
            <div className="flex border-b border-white/5 overflow-x-auto">
              {FILTER_TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors border-b-2",
                    filter === key
                      ? "text-texas-500 border-texas-500"
                      : "text-ink-200 border-transparent hover:text-white"
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                  {key === "draft-ready" && (
                    <span className="ml-1 bg-blue-400/20 text-blue-300 text-xs px-1.5 rounded-full">
                      {visibleEmails.filter((e) => e.status === "draft-ready").length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {agentRunning ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 gap-4">
                <RefreshCw className="size-8 text-texas-500 animate-spin" />
                <div className="text-center">
                  <div className="text-sm font-medium text-white mb-1">Agent Processing…</div>
                  <div className="text-xs text-ink-200">Reading inboxes · Classifying · Drafting replies</div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <EmailList
                  emails={visibleEmails}
                  selected={selected}
                  onSelect={setSelected}
                  filter={filter}
                />
              </div>
            )}
          </div>

          {/* Thread viewer */}
          <div className="lg:col-span-3 rounded-xl border border-white/10 bg-white/3 min-h-[480px] flex flex-col">
            {selectedEmail ? (
              <ThreadViewer
                email={selectedEmail}
                onApprove={handleApprove}
                onSkip={handleSkip}
                onEdit={handleEdit}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-ink-200/50 py-16">
                <MailOpen className="size-12" />
                <div className="text-sm">Select an email to view</div>
              </div>
            )}
          </div>
        </div>

        {/* Domain manager */}
        <DomainManager />

        {/* Setup instructions */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="size-4 text-texas-500" />
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Add More Accounts
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                icon: "📧",
                title: "Gmail",
                desc: "info@dfwhome.loans connected via Google MCP",
                status: "Connected",
                color: "text-green-400",
              },
              {
                icon: "📨",
                title: "Outlook / Microsoft 365",
                desc: "tony@nofluffmarketing.onmicrosoft.com connected",
                status: "Connected",
                color: "text-green-400",
              },
              {
                icon: "➕",
                title: "Additional Accounts",
                desc: "Connect more Gmail or Outlook accounts in MCP settings",
                status: "Available",
                color: "text-ink-200",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 rounded-lg p-4 border border-white/5"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-white mb-1">{item.title}</div>
                <div className="text-xs text-ink-200 mb-2">{item.desc}</div>
                <span className={cn("text-xs font-medium", item.color)}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
