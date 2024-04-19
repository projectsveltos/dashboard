import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AvatarRectangle,
  AvatarRectFallback,
} from "@/components/ui/avatar-rectangle";
import { ReadyFlag } from "@/pages/clusters-list/components/flags/ReadyFlag";
import { FailedFlag } from "@/pages/clusters-list/components/flags/FailedFlag";

interface ClusterCardProps {
  name: string;
  version: string;
  namespace: string;
  status: Boolean;
  labels: {
    designation: string;
    color: string;
  }[];
}

export const ClusterCard = ({
  name,
  version,
  namespace,
  labels,
  status,
}: ClusterCardProps) => {
  return (
    <>
      <Card>
        <div className=" flex items-center space-x-4 rounded-md  p-4">
          {status ? <ReadyFlag /> : <FailedFlag />}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {name}
              <span className={"text-muted-foreground"}>{version}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Namespace: <span className="text-main-500">{namespace}</span>
            </p>
          </div>
          {labels?.length > 0 && (
            <div className="flex items-center space-x-2">
              {labels?.map((label) => (
                <Badge key={label.designation} variant="secondary">
                  {label.designation}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
