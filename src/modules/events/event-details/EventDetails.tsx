import { useParams } from "react-router-dom";
import { useState } from "react";
import { Activity, Globe, Terminal, Check, Copy } from "lucide-react";
import { ResourceSelectorView } from "@/modules/events/event-details/components/ResourceSelector";
import useEventDetails from "@/modules/events/event-details/hooks/useEventDetails";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/data-display/card";
import { Button } from "@/lib/components/ui/inputs/button";
import { EventPageHeading } from "@/modules/events/event-details/components/EventPageHeading";
import { ClusterMatchCard } from "./components/ClusterMatchCard";
import { generateEventYaml } from "./utils/eventYamlGenerator";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/hooks/useTheme";
import { LoadingPage } from "@/lib/components/ui/feedback/LoadingPage";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { Badge } from "@/lib/components/ui/data-display/badge";

const EventDetails = () => {
  const { name } = useParams();
  const { data, isLoading, isError } = useEventDetails(
    name as string | undefined,
  );
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );
  if (isError || !data)
    return (
      <div>
        <ErrorQuery name={"Event Triggers"} error={"Failed to load data"} />
      </div>
    );

  const YAML_SOURCE = generateEventYaml(data);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(YAML_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-1">
              <EventPageHeading name={data.eventTriggerName} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card/40 border-border/40 shadow-sm">
                <CardHeader className="py-3 px-4 border-b border-border/40 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-[10px] font-bold  text-muted-foreground flex items-center gap-2">
                    <Globe className="h-3 w-3" /> Target Scope
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      <dd className="font-medium">
                        <Badge variant={"outline"}>
                          {Object.entries(
                            data.clusterSelector?.matchLabels ?? {},
                          ).map(([key, value]) => `${key}: ${value}`)}
                        </Badge>
                      </dd>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/40 shadow-sm">
                <ResourceSelectorView eventSource={data.eventSource} />
              </Card>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <h2 className="text-[10px] font-bold t text-muted-foreground flex items-center gap-2">
                  <Activity className="h-3 w-3 text-primary" /> Matched Clusters
                </h2>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {data.clusterEventMatches?.length ?? 0} clusters linked
                </span>
              </div>
              <div className="overflow-y-auto max-h-[48rem] pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.clusterEventMatches?.map((cluster, idx) => (
                    <ClusterMatchCard key={idx} cluster={cluster} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Inspector */}
          <div className="w-full lg:w-96 shrink-0">
            <Card className="bg-card/40 border-border/40 h-full flex flex-col sticky top-20 shadow-sm">
              <CardHeader className="py-3 px-4 border-b border-border/40 flex flex-row items-center justify-between space-y-0 bg-muted/20">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Terminal className="h-3 w-3" /> YAML Definition
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <div className="relative group h-full">
                  <SyntaxHighlighter
                    language="yaml"
                    style={theme === "dark" ? vscDarkPlus : prism}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      height: "100%",
                      fontSize: "11px",
                      lineHeight: "1.5",
                      background: "transparent",
                    }}
                    wrapLines={true}
                    showLineNumbers={false}
                  >
                    {YAML_SOURCE}
                  </SyntaxHighlighter>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
