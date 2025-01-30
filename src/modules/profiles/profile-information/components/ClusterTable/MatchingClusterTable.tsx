import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { profileInfo } from "@/modules/profiles/profile-information/mock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  ChevronRight,
  CircleEqual,
  Copy,
  EqualSquare,
  FileSliders,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MatchingClusterTable() {
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  const toggleAccordion = (accordionId: number) => {
    setOpenAccordions((prev) =>
      prev.includes(accordionId)
        ? prev.filter((id) => id !== accordionId)
        : [...prev, accordionId],
    );
  };

  return (
    <Card className="overflow-hidden my-2">
      <CardHeader>
        <CardTitle className={"flex items-center"}>
          <CircleEqual className={"w-4 h-4 mx-0.5"} /> Matching Clusters
        </CardTitle>
        <CardDescription>
          List of clusters that are matching the selected profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400] rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Cluster Name</TableHead>
                <TableHead>Namespace</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profileInfo.matchingClusters.map((cluster, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={() => toggleAccordion(index)}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      {openAccordions.includes(index) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell>{cluster.cluster.name}</TableCell>
                    <TableCell>{cluster.cluster.namespace}</TableCell>
                    <TableCell>
                      {cluster.clusterFeatureSummaries.some(
                        (feature) => feature.failureMessage,
                      ) ? (
                        <Badge variant={"destructive"}>Failed</Badge>
                      ) : (
                        <Badge variant={"default"}> Provisioned</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    className={cn(
                      "bg-muted/50 transition-all",
                      openAccordions.includes(index) ? "table-row" : "hidden",
                    )}
                  >
                    <TableCell colSpan={4} className="p-0">
                      <div
                        className={cn(
                          "grid transition-all",
                          openAccordions.includes(index)
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Feature ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Failure Message</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {cluster.clusterFeatureSummaries.map(
                                (feature, featureIndex) => (
                                  <TableRow key={featureIndex}>
                                    <TableCell>{feature.featureID}</TableCell>
                                    <TableCell>{feature.status}</TableCell>
                                    <TableCell>
                                      {feature.failureMessage || "-"}
                                    </TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
