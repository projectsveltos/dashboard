import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardsFilterToolbar } from "@/pages/clusters-list/components/CardsFilterToolbar";

export default function ClustersList() {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Clusters</h2>
            <p className="text-muted-foreground w-2/3">
              You can view all clusters,retry failed deployments, and find troubleshooting guides
              for any cluster.
              <a href="#" className="text-main-500 hover:text-main-800"> Retry</a> or <a
              href="https://kubernetes.io/docs/home/" className="text-main-500 hover:text-main-800">Docs &
              Troubleshooting</a>.
            </p>
          </div>
          <CardsFilterToolbar />
        </div>
      </div>
    </>
  );
}
