import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

export function RecentEventsTable() {
  const events = [
    {
      severity: "CRITICAL",
      icon: <AlertCircle className="w-4 h-4 text-coral mr-2" />,
      color: "text-coral",
      cluster: "prod-us-east-01",
      message: "Resource drift detected in 'ingress-controller' deployment.",
      time: "2m ago",
    },
    {
      severity: "INFO",
      icon: <Info className="w-4 h-4 text-primary mr-2" />,
      color: "text-primary",
      cluster: "staging-eu-west-12",
      message: "Cluster profile 'security-hardened-v2' applied successfully.",
      time: "14m ago",
    },
    {
      severity: "SUCCESS",
      icon: <CheckCircle2 className="w-4 h-4 text-mint mr-2" />,
      color: "text-mint",
      cluster: "dev-local-minikube",
      message: "Addon 'prometheus-stack' deployed and ready.",
      time: "45m ago",
    },
    {
      severity: "WARNING",
      icon: <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />,
      color: "text-orange-400",
      cluster: "prod-asia-south-04",
      message: "Connectivity threshold exceeded for node 'worker-04'.",
      time: "1h ago",
    },
    {
      severity: "INFO",
      icon: <Info className="w-4 h-4 text-primary mr-2" />,
      color: "text-primary",
      cluster: "prod-us-west-02",
      message: "Auto-reconciliation started for namespace 'billing'.",
      time: "3h ago",
    },
  ];

  return (
    <div className="w-full overflow-x-auto text-[10px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-[9px] uppercase tracking-widest text-muted-foreground font-bold bg-muted/20">
            <th className="py-2.5 px-4 font-semibold">Severity</th>
            <th className="py-2.5 px-4 font-semibold">Cluster</th>
            <th className="py-2.5 px-4 font-semibold w-1/2">Message</th>
            <th className="py-2.5 px-4 font-semibold text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <tr
              key={i}
              className="border-b border-border/40 hover:bg-muted/30 transition-colors"
            >
              <td className="py-2.5 px-4 whitespace-nowrap">
                <div className="flex items-center font-bold tracking-wider">
                  {event.icon}
                  <span className={event.color}>{event.severity}</span>
                </div>
              </td>
              <td className="py-2.5 px-4 font-medium text-foreground/80">
                {event.cluster}
              </td>
              <td className="py-2.5 px-4 text-muted-foreground">
                {event.message}
              </td>
              <td className="py-2.5 px-4 text-right text-muted-foreground/60 whitespace-nowrap">
                {event.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="py-2 px-4 text-right border-t border-border">
        <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider transition-all inline-flex items-center">
          VIEW ALL LOGS
        </button>
      </div>
    </div>
  );
}
