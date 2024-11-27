import { Card } from "@/components/ui/card";
import { FileInputIcon } from "lucide-react";

export function ProfileCard() {
  return (
    <>
      <Card
        className={
          "bg-slate-700 border-slate-900 hover:bg-gray-100 dark:hover:bg-gray-700 w-[330px] hover:cursor-pointer"
        }
      >
        <div className=" flex items-center space-x-4 rounded-md  p-4">
          {<FileInputIcon />}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {"prometheus-grafana"}
            </p>
            <p className="text-sm text-muted-foreground  py-1">
              kind: <span className="text-main-500 ">ClusterPorfile</span>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
