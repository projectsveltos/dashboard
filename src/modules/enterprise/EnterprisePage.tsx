import { useState } from "react";
import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { ClusterCard } from "@/modules/clusters/clusters-list/components/ClusterCard";
import {
  Lock,
  ShieldCheck,
  ExternalLink,
  Network,
  Shield,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "pull-mode", label: "Pull-Mode Architecture", icon: Network },
  { id: "drift", label: "Automated Drift Detection", icon: Clock },
  { id: "rbac", label: "Advanced RBAC & Multi-tenancy", icon: Shield },
  { id: "rollouts", label: "Progressive Rollouts", icon: ArrowRight },
  { id: "support", label: "Dedicated Support SLA", icon: LifeBuoy },
];

export function EnterprisePage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      <PageHeading
        title="Sveltos Enterprise"
        description="Unlock advanced capabilities designed for massive scale, strict compliance, and highly restricted edge environments."
      />

      <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left w-full",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* Feature Header (Replaces the overlay modal) */}
          <div className="bg-card border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Lock className="w-32 h-32" />
            </div>

            <div className="flex-1 max-w-2xl">
              <Badge className="bg-primary/10 text-primary border-none shadow-none font-bold px-3 py-1 text-[10px] mb-4 rounded-full uppercase tracking-widest">
                Enterprise Feature
              </Badge>

              {activeTab === "pull-mode" && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Unlock Pull-Mode Architecture
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Managing edge locations or highly secure data centers? Pull
                    Mode allows clusters to securely pull configurations from
                    the management cluster without exposing inbound ports or
                    requiring VPNs.
                  </p>
                </>
              )}
              {activeTab === "drift" && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Enforce Strict Compliance
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Instantly detect when someone makes manual, unauthorized
                    changes directly to your managed clusters. Automatically
                    overwrite their changes to maintain desired state.
                  </p>
                </>
              )}
              {activeTab === "rbac" && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Unlock True Multi-Tenancy
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Securely isolate teams, workloads, and permissions across
                    your entire fleet. Granular RBAC ensures users only see and
                    manage what they are explicitly authorized to.
                  </p>
                </>
              )}
              {activeTab === "rollouts" && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Deploy with Confidence
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automate and safely manage phased rollouts across massive
                    Kubernetes fleets. Deploy to Ring 1, test automatically, and
                    progressively roll out to Production.
                  </p>
                </>
              )}
              {activeTab === "support" && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Mission-Critical Support
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get direct access to the core engineering team who built
                    Sveltos. Guaranteed SLA response times for critical
                    infrastructure issues when you need it most.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full md:w-64 shrink-0 relative z-10">
              <a
                href="https://projectsveltos.github.io/sveltos/"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button className="w-full h-12 rounded-xl font-bold shadow-none">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Upgrade to Enterprise
                </Button>
              </a>
              <a
                href="https://projectsveltos.github.io/sveltos/"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl font-bold shadow-none text-muted-foreground border-border bg-card hover:bg-muted"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </a>
            </div>
          </div>

          {/* Active Mock UI (Fully visible, but locked/read-only) */}
          <div className="relative border border-border rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 p-8 overflow-hidden pointer-events-none">
            {activeTab === "pull-mode" && <PullModeMock />}
            {activeTab === "drift" && <DriftMock />}
            {activeTab === "rbac" && <RBACMock />}
            {activeTab === "rollouts" && <RolloutsMock />}
            {activeTab === "support" && <SupportMock />}

            {/* Subtle lock overlay to indicate read-only without hiding data */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/40 flex items-end justify-center pb-8">
              <div className="bg-background/80 backdrop-blur-md border border-border px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold text-muted-foreground shadow-sm">
                <Lock className="w-4 h-4" /> Preview Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mock UI Components ────────────────────────────────────────────────────────

function PullModeMock() {
  const mockClusters = [
    {
      name: "edge-gateway-eu",
      namespace: "pull-fleet",
      version: "v1.28.3",
      paused: false,
      status: true,
      failureMsg: null,
      labels: { region: "eu-west", mode: "pull", env: "prod" } as Record<
        string,
        string
      >,
    },
    {
      name: "retail-store-001",
      namespace: "pull-fleet",
      version: "v1.28.3",
      paused: false,
      status: true,
      failureMsg: null,
      labels: { store: "001", mode: "pull", env: "edge" } as Record<
        string,
        string
      >,
    },
    {
      name: "retail-store-002",
      namespace: "pull-fleet",
      version: "v1.27.4",
      paused: false,
      status: false,
      failureMsg: "Node not ready",
      labels: { store: "002", mode: "pull", env: "edge" } as Record<
        string,
        string
      >,
    },
    {
      name: "iot-hub-us",
      namespace: "pull-fleet",
      version: "v1.29.0",
      paused: false,
      status: true,
      failureMsg: null,
      labels: { region: "us-east", mode: "pull", env: "prod" } as Record<
        string,
        string
      >,
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-6">Pull-Mode Clusters (4)</h3>
      <div className="flex flex-wrap -m-2">
        {mockClusters.map((cluster, index) => (
          <div key={index} className="w-full md:w-1/2 p-2">
            <ClusterCard
              onClick={() => {}}
              name={cluster.name}
              version={cluster.version}
              namespace={cluster.namespace}
              paused={cluster.paused}
              status={cluster.status}
              failureMsg={cluster.failureMsg}
              labels={cluster.labels}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DriftMock() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        Compliance Dashboard
        <Badge className="bg-orange-500/10 text-orange-500 border-none px-2 rounded">
          2 Drifts Detected
        </Badge>
      </h3>
      <div className="border border-border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold">Target Cluster</th>
              <th className="px-6 py-4 font-bold">Profile</th>
              <th className="px-6 py-4 font-bold">Resource</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              {
                cluster: "prod-us-east",
                profile: "kyverno-policies",
                res: "ClusterPolicy/require-labels",
                status: "Remediated",
                bad: false,
              },
              {
                cluster: "edge-retail-002",
                profile: "nginx-ingress",
                res: "ConfigMap/nginx-config",
                status: "Drift Detected",
                bad: true,
              },
              {
                cluster: "dev-cluster-main",
                profile: "monitoring-stack",
                res: "Deployment/grafana",
                status: "Remediated",
                bad: false,
              },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{row.cluster}</td>
                <td className="px-6 py-4">{row.profile}</td>
                <td className="px-6 py-4 font-mono text-xs">{row.res}</td>
                <td className="px-6 py-4">
                  {row.bad ? (
                    <span className="flex items-center gap-1.5 text-orange-500 font-bold">
                      <AlertTriangle className="w-4 h-4" /> {row.status}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-green-500 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> {row.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RBACMock() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6">Tenant Management</h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            name: "Team Alpha",
            namespaces: "frontend-*",
            clusters: "prod-*, dev-*",
            color: "text-blue-500",
          },
          {
            name: "Team Beta",
            namespaces: "backend-*",
            clusters: "prod-east",
            color: "text-emerald-500",
          },
          {
            name: "Data Science",
            namespaces: "jupyter-*",
            clusters: "gpu-cluster",
            color: "text-purple-500",
          },
        ].map((t, i) => (
          <div key={i} className="border border-border rounded-xl p-5 bg-card">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-muted/50 ${t.color}`}
            >
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-lg mb-4">{t.name}</h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">
                  Allowed Namespaces
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {t.namespaces}
                </Badge>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider font-bold mb-1">
                  Allowed Clusters
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {t.clusters}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RolloutsMock() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6">
        Phased Rollout:{" "}
        <span className="text-primary font-mono text-sm">
          profile/security-baseline-v2
        </span>
      </h3>
      <div className="space-y-6">
        {[
          {
            ring: "Ring 1 (Canary)",
            progress: "100%",
            status: "Complete",
            complete: true,
          },
          {
            ring: "Ring 2 (Staging)",
            progress: "65%",
            status: "Deploying...",
            complete: false,
          },
          {
            ring: "Ring 3 (Production)",
            progress: "0%",
            status: "Waiting",
            complete: false,
          },
        ].map((r, i) => (
          <div key={i} className="border border-border rounded-xl p-5 bg-card">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold">{r.ring}</h4>
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  r.complete ? "text-green-500" : "text-primary",
                )}
              >
                {r.status}
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  r.complete ? "bg-green-500" : "bg-primary animate-pulse",
                )}
                style={{ width: r.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportMock() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Support Tickets</h3>
        <Button size="sm" className="rounded-full shadow-none font-bold">
          New Ticket
        </Button>
      </div>
      <div className="border border-border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold">ID</th>
              <th className="px-6 py-4 font-bold">Subject</th>
              <th className="px-6 py-4 font-bold">Priority</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              {
                id: "SVL-1042",
                subject: "SLA: Cluster sync failing on Edge node",
                prio: "Critical",
                status: "In Progress",
              },
              {
                id: "SVL-1038",
                subject: "Question regarding RBAC setup",
                prio: "Low",
                status: "Resolved",
              },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                <td className="px-6 py-4 font-medium">{row.subject}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className={
                      row.prio === "Critical"
                        ? "border-red-500 text-red-500"
                        : ""
                    }
                  >
                    {row.prio}
                  </Badge>
                </td>
                <td className="px-6 py-4">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
