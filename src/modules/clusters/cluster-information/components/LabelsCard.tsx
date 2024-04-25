import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blocks, Tags, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/types/cluster";
import { Badge } from "@/components/ui/badge";

type LabelsCardProps = {
  labels: Label[];
};

export const LabelsCard = ({ labels }: LabelsCardProps) => {
  return (
    <>
      <div>
        <Card x-chunk="dashboard-07-chunk-3">
          <CardHeader>
            <CardTitle className={"flex items-center space-x-3"}>
              <Tags className={"w-4 h-4 mx-0.5"} /> Labels{" "}
              <Badge variant="outline"> Total : {labels.length}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap ">
              {labels.map((label) => (
                <Badge
                  key={label.designation}
                  className={"m-2 p-2 rounded"}
                  variant="secondary"
                >
                  {label.designation}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
