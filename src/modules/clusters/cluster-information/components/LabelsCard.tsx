import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";
import { Label } from "@/types/cluster";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

type LabelsCardProps = {
  labels: Label[];
};

export const LabelsCard = ({ labels }: LabelsCardProps) => {
  useEffect(() => {
    console.log("LabelsCard", labels);

  }, [labels]);
  const labelEntries = Object.entries(labels || {});
  return (

    <>
      <div>
        <Card x-chunk="dashboard-07-chunk-3">
          <CardHeader>
            <CardTitle className={"flex items-center space-x-3"}>
              <Tags className={"w-4 h-4 mx-0.5"} /> Labels{" "}
              <Badge variant="outline"> Total : {labelEntries.length}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap ">
              {labelEntries.length>0 && labelEntries.map(([key, value]) => (
                <Badge
                  key={key}
                  className={"m-2 p-2 rounded"}
                  variant="secondary"
                >

                  <p>{`${key}: ${value}`}</p>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
