import { EventTriggerSummary } from "@/types/event.types";
import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/lib/components/ui/data-display/avatar-rectangle";
import { Card } from "@/lib/components/ui/data-display/card";

import { RouteIcon } from "lucide-react";

export const EventCard = ({
  event,
  onClick,
}: {
  event: EventTriggerSummary;
  onClick?: () => void;
}) => {
  return (
    <Card
      className={
        "hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
      }
      onClick={onClick}
    >
      <div className=" flex items-center space-x-4 rounded-md  p-4">
        <div>
          <AvatarRectangle className="w-9 h-9">
            <AvatarRectFallback
              className={
                "bg-primary text-white flex items-center justify-center h-full w-full"
              }
            >
              <RouteIcon className={"h-6 w-6"} />
            </AvatarRectFallback>
          </AvatarRectangle>
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          <p className="text-sm font-medium leading-none truncate">
            {event.name}
          </p>
          <div className="text-xs text-muted-foreground py-1 truncate">
            Event Trigger
          </div>
        </div>

        <div className="text-right flex flex-col justify-center">
          <div className="text-xs text-muted-foreground">Matching Clusters</div>
          <div className="text-lg font-bold">{event.matchingClusters}</div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
