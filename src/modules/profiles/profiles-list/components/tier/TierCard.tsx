import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/modules/profiles/profiles-list/components/profile/ProfileCard/ProfileCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TierCard() {
  return (
    <>
      <Card className={"max-w-sm bg-muted-foreground"}>
        <CardHeader className={"bg-slate-700 mb-4 flex-row gap-4 "}>
          <h1 className={""}>
            <span className={"text-muted-foreground mr-2"}>Tier</span>
            <span>
              <Badge variant={"label"} className={"text-md"}>
                Security-GRP2
              </Badge>
            </span>
          </h1>
          <p className={"text-muted-foreground l text-sm"}>45 profile(s)</p>
          <div className={"flex-grow"}></div>
          <Button variant={"ghost"} size={"xs"}>
            <EllipsisVertical />
          </Button>
        </CardHeader>
        <CardContent className={"h-[500px] "}>
          <ScrollArea
            className={"grid grid-cols-1 gap-4 h-[500px]  overflow-auto"}
          >
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className={"flex items-center my-2"}>
                <ProfileCard />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
