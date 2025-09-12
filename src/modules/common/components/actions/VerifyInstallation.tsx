import { useMcp } from "@/hooks/useMcp";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";

export function VerifyInstallation() {
  const { installationQuery } = useMcp(null, null, null, null, null);

  function triggerQuery() {
    installationQuery?.refetch();
  }
  return (
    <McpButton
      variant="default"
      onClick={triggerQuery}
      isLoading={installationQuery?.isFetching}
      popupText={installationQuery?.data || ""}
    >
      Verify Installation
    </McpButton>
  );
}
