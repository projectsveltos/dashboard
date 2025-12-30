import { useMcp } from "@/hooks/useMcp";
import { McpButton } from "@/lib/components/ui/inputs/mcp-button";
import { CheckIcon } from "@radix-ui/react-icons";
import { Sparkles } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

export function VerifyInstallation() {
  const { t } = useTranslation();
  const { installationQuery } = useMcp("", "", "", "", "");

  function triggerQuery() {
    installationQuery?.refetch();
  }
  return (
    <McpButton
      variant="default"
      onClick={triggerQuery}
      icon={
        installationQuery?.data?.is_correctly_installed ? (
          <CheckIcon className="mr-2 h-4 w-4 animate-pulse mx-auto text-green-600" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4 mx-auto text-yellow-500" />
        )
      }
      isLoading={installationQuery?.isFetching}
      mcpResponse={
        installationQuery?.data?.details || t("common.no_verification_data")
      }
    >
      {installationQuery?.data?.is_correctly_installed
        ? t("common.correctly_installed")
        : t("common.verify_installation")}
    </McpButton>
  );
}
