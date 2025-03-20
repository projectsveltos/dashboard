import { Card, CardContent, CardHeader } from "@/lib/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import { ProfileCard } from "@/modules/profiles/profiles-list/components/profile/ProfileCard/ProfileCard";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { Tier } from "@/types/profile.types";

export function TierCard({ tier }: { tier: Tier }) {
  return (
    <>
      <Card className={"max-w-sm bg-primary/5  "}>
        <CardHeader
          className={"border-primary border-b-2 mb-4 flex-row gap-4 "}
        >
          <h1 className={""}>
            <span className={"dark:text-muted-foreground  mr-2"}>Tier</span>
            <span>
              <Badge
                variant={"label"}
                className={"text-md bg-slate-200 dark:bg-slate-800"}
              >
                {tier?.id}
              </Badge>
            </span>
          </h1>
          <p className={"dark:text-muted-foreground   text-sm"}>
            {tier.totalProfiles} profile(s)
          </p>
          <div className={"flex-grow"}></div>
          <Button disabled variant={"ghost"} size={"xs"}>
            <EllipsisVertical />
          </Button>
        </CardHeader>
        <CardContent className={"h-[400px] "}>
          <ScrollArea
            className={"grid grid-cols-1 gap-4 h-[400px]  overflow-auto"}
          >
            {tier?.profiles.map((profile, index) => (
              <div key={index} className={"flex items-center my-2"}>
                <ProfileCard profile={profile} />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
