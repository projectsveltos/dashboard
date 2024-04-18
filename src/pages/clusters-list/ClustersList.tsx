import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsFilter } from "@/pages/clusters-list/components/CardsFilter";

export default function ClustersList() {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Clusters</h2>
            <p className="text-muted-foreground">List of all clusters</p>
          </div>
          <CardsFilter />
        </div>
      </div>
    </>
  );
}
