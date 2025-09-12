import { Card, CardTitle } from "@/lib/components/ui/data-display/card";
import { Tags } from "lucide-react";
import { Label } from "@/types/cluster.types";
import { Badge } from "@/lib/components/ui/data-display/badge";

type LabelsCardProps = {
  labels: Label[] | [];
};

export const LabelsCard = ({ labels }: LabelsCardProps) => {
  const labelEntries = Object.entries(labels || {});
  return (
    <>
      <div>
        {labelEntries.length > 0 && (
          <Card className={"px-4"}>
            <CardTitle className={"flex items-center m-2  space-x-3"}>
              <Tags className={"w-4 h-4 mx-0.5"} /> Labels{" "}
              <Badge variant="outline"> Total : {labelEntries.length}</Badge>
            </CardTitle>
            <div className="overflow-x-auto h-14 whitespace-nowrap">
              {labelEntries.length > 0 &&
                labelEntries.map(([key, value]) => (
                  <Badge
                    key={key}
                    className="inline-block m-2 max-h-10 p-2 rounded"
                    variant="secondary"
                  >
                    <p className="inline">{`${key}: ${value}`}</p>
                  </Badge>
                ))}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};
