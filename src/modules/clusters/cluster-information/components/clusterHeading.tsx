import { Button } from "@/lib/components/ui/inputs/button";
import { ArrowUpCircle, Check, ChevronLeft } from "lucide-react";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { useNavigate } from "react-router-dom";
import { Icons } from "@/lib/components/icons";
import { RefreshButton } from "@/modules/common/components/actions/RefreshButton";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import { DebugClusterResponse } from "@/hooks/useMcp";
import { useTranslation } from "react-i18next";

type ClusterHeadingProps = {
  name: string;
  version?: string;
  ready?: boolean;
  namespace?: string;
  hideDetails?: boolean;
  failureMsg?: string | null;
  mcpDebugQuery?: {
    refetch: () => void;
    isFetching: boolean;
    isError: boolean;
    data?: DebugClusterResponse;
  };
  outdatedHelmChartsQuery?: {
    refetch: () => void;
    isFetching: boolean;
    isError: boolean;
    data?: string[];
  };
};

export const ClusterHeading = ({
  name,
  version,
  ready,
  hideDetails,
  namespace,
  failureMsg,
  mcpDebugQuery,
  outdatedHelmChartsQuery,
}: ClusterHeadingProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function triggerMcpDebugQuery() {
    mcpDebugQuery?.refetch();
  }
  function triggerOutdatedHelmChartsQuery() {
    outdatedHelmChartsQuery?.refetch();
  }
  return (
    <>
      <div className="flex my-4 items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {name}
        </h1>
        {version && !hideDetails && (
          <Badge
            variant="outline"
            className="ml-auto sm:ml-0  flex items-center "
          >
            version : {version}
          </Badge>
        )}
        <Badge
          variant="outline"
          className="ml-auto sm:ml-0  flex items-center "
        >
          namespace : {namespace}
        </Badge>
        {!hideDetails && (
          <Badge
            variant="outline"
            className={`ml-auto sm:ml-0 ${failureMsg ? "bg-red-500" : "bg-main-500"}  flex items-center text-white`}
          >
            <Icons.k8s className="w-4 h-4 mr-1" />
            {failureMsg ? "Unhealthy" : "Healthy"}
          </Badge>
        )}
        {!hideDetails && (
          <Badge
            variant="outline"
            className={`ml-auto sm:ml-0 ${ready ? "bg-green-500" : "bg-yellow-400"}  flex items-center text-white`}
          >
            <Check className="w-4 h-4 mr-1" />
            {ready ? "Ready" : "Unready"}
          </Badge>
        )}

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <McpButton
            onClick={triggerOutdatedHelmChartsQuery}
            isLoading={outdatedHelmChartsQuery?.isFetching}
            icon={
              <ArrowUpCircle className="mr-2 h-4 w-4 mx-auto text-sky-500" />
            }
            mcpResponse={
              outdatedHelmChartsQuery?.isError
                ? t("common.mcp_unavailable")
                : outdatedHelmChartsQuery?.data?.length
                  ? outdatedHelmChartsQuery.data
                  : t("common.no_updates_data_relax")
            }
          >
            {t("common.updates")}
          </McpButton>
          <McpButton
            onClick={triggerMcpDebugQuery}
            isLoading={mcpDebugQuery?.isFetching}
            mcpResponse={
              mcpDebugQuery?.isError
                ? t("common.mcp_unavailable")
                : mcpDebugQuery?.data?.formattedData?.length
                  ? mcpDebugQuery.data.formattedData
                  : t("common.no_debug_data_relax")
            }
          >
            {t("common.debug")}
          </McpButton>
          <RefreshButton />
        </div>
      </div>
    </>
  );
};
