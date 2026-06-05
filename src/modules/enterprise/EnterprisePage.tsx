import {
  ShieldCheck,
  ExternalLink,
  Network,
  ArrowRight,
  LifeBuoy,
  GitBranch,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { Logo } from "@/lib/components/assets/logo/logo";
import { Badge } from "@/lib/components/ui/data-display/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/lib/components/ui/data-display/card";

const PRICING_URL = "https://website.projectsveltos.io/pricing/";

const FEATURES = [
  {
    title: "Pull Mode Architecture",
    description:
      "Deploy to edge locations and air-gapped networks. No inbound firewall ports required ever.",
    icon: Network,
    tag: "Networking",
    href: "https://projectsveltos.io/latest/register/register_cluster_pull_mode/",
  },
  {
    title: "Progressive Rollout Pipelines",
    description:
      "Ship changes safely across thousands of clusters with automated canary rings and promotion gates.",
    icon: GitBranch,
    tag: "Deployment",
    href: "https://projectsveltos.io/latest/deployment_order/progressive_rollout/",
  },
  {
    title: "AI-Powered Management",
    description:
      "Natural language operations via MCP Server. Ask questions, diagnose incidents, and automate remediation.",
    icon: Zap,
    tag: "AI",
    href: "https://projectsveltos.io/latest/features/mcp/",
  },
  {
    title: "Dedicated Support & SLA",
    description:
      "Direct line to Sveltos core engineers. Priority ticketing, guaranteed response times, and dedicated Slack.",
    icon: LifeBuoy,
    tag: "Support",
    href: "https://website.projectsveltos.io/pricing/",
  },
];

const TRUST_ITEMS = [
  "Air-Gap Ready",
  "RBAC Native",
  "Multi-Tenancy",
  "GitOps First",
  "CNCF Ecosystem",
];

export function EnterprisePage() {
  return (
    <div className="w-full flex flex-col space-y-8 animate-in slide-in-from-bottom pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" showText={false} />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Discover our Sveltos Enterprise features
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href={PRICING_URL} target="_blank" rel="noreferrer">
            <Button className="h-11 px-6 font-bold gap-2">
              <ShieldCheck className="h-4 w-4" />
              Upgrade to Enterprise
            </Button>
          </a>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-muted/30 rounded-xl border border-border px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            {item}
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <a
              key={feature.title}
              href={feature.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-extrabold group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-bold uppercase tracking-wider"
                      >
                        {feature.tag}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm font-medium leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                    Technical Documentation
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardContent className="p-8 md:p-12 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Ready to scale your infrastructure?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg font-medium">
              Join leading organizations managing production Kubernetes with
              Sveltos Enterprise. Get dedicated engineering support, SLA
              guarantees, and enterprise-grade features.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href={PRICING_URL} target="_blank" rel="noreferrer">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-black gap-2"
              >
                <ShieldCheck className="h-5 w-5" />
                Get Enterprise Access
              </Button>
            </a>
            <a href={PRICING_URL} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-10 text-base font-black gap-2"
              >
                View Pricing & SLA
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
