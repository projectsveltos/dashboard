import * as React from "react";
import { Button, ButtonProps } from "@/lib/components/ui/button";
import { useIsFetching, useQueryClient } from "react-query";

import { RefreshCcw } from "lucide-react";

const RefreshButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const queryClient = useQueryClient();
    const isFetching = useIsFetching();
    const handleRefresh = () => {
      queryClient.refetchQueries();
    };
    return (
      <Button
        {...props}
        variant={"outline"}
        disabled={isFetching > 0}
        onClick={handleRefresh}
        className={className}
        ref={ref}
      >
        <>
          {isFetching > 0 ? (
            <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <RefreshCcw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </>
      </Button>
    );
  },
);
RefreshButton.displayName = "Button";

export { RefreshButton };
