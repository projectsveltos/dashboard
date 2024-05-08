import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, RefreshCcw } from "lucide-react";
import { appConfig } from "@/config/app";
import { useQueryClient } from "react-query";
import { RefreshButton } from "@/components/ui/RefreshButton";

type ErrorFetchingProps = {
  name: string;
  error: unknown;
  queryKey?: string;
};

export const ErrorQuery = ({ name, error, queryKey }: ErrorFetchingProps) => {
  const reportError = () => {
    window.open(appConfig.github.url + "/issues/new", "_blank");
  };

  return (
    <div className={"mt-16"}>
      <Alert variant="destructive" className={"mt-4"}>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle className={"font-bold "}>Error</AlertTitle>
        <AlertDescription>
          <div className="flex justify-between items-center mt-2">
            <span>
              Failed to retrieve {name}, please ensure the backend is running on
              port <strong> {import.meta.env.VITE_BACKEND_PORT}</strong>.
            </span>

            <div className={"flex justify-end space-4"}>
              <RefreshButton />
              <Button
                variant="destructive"
                onClick={reportError}
                className={"text-sm mx-2"}
              >
                <AlertTriangleIcon className={"w-4 h-4 mr-2"} />
                Report Issue
              </Button>
            </div>
          </div>
          {error instanceof Error && (
            <p className="text-sm text-gray-500">{error.message}</p>
          )}
        </AlertDescription>
        <br />
      </Alert>
    </div>
  );
};
