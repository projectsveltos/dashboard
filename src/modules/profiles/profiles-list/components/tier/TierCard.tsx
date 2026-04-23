import {
  Card,
  CardContent,
  CardHeader,
} from "@/lib/components/ui/data-display/card";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { ProfileCard } from "@/modules/profiles/profiles-list/components/profile/ProfileCard/ProfileCard";
import { ScrollArea } from "@/lib/components/ui/layout/scroll-area";
import { Tier } from "@/types/profile.types";

export function TierCard({ tier, dryRun }: { tier: Tier; dryRun?: boolean }) {
  return (
    <>
      <Card className="max-w-sm">
        <CardHeader className="border-b border-border mb-2 flex-row gap-3 py-3 px-4">
          <h1 className="flex items-center">
            <span className="text-muted-foreground mr-2 text-xs font-bold uppercase tracking-wider">
              Tier
            </span>
            <span>
              <Badge className="bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-none font-bold px-2 py-0">
                {tier?.id}
              </Badge>
            </span>
          </h1>
          <p className="text-muted-foreground text-[10px] self-center">
            {tier.totalProfiles} profiles
          </p>
          <div className="flex-grow"></div>
          <Button disabled variant="ghost" size="xs" className="h-6 w-6 p-0">
            <EllipsisVertical className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="h-[300px] p-2">
          <ScrollArea className="h-full px-2">
            {tier?.profiles.map((profile, index) => (
              <div key={index} className={"flex items-center my-2"}>
                <ProfileCard profile={profile} dryRun={dryRun} />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
