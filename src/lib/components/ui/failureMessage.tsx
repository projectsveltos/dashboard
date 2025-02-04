import { Alert, AlertDescription } from "@/lib/components/ui/alert";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
import { Copy } from "lucide-react";

export function FailureMessage({ msg }: { msg?: string | undefined | null }) {
  function handleCopy() {
    navigator.clipboard.writeText(msg as string);
    toast.message("Copied to clipboard");
  }
  return (
    <>
      {msg && (
        <Alert onClick={handleCopy} className="flex items-center">
          <Copy className="h-4 w-4 cursor-pointer" />
          <Tooltip>
            <TooltipTrigger>
              <AlertDescription className="mr-2 line-clamp-3 text-start overflow-hidden ">
                {msg}
              </AlertDescription>
            </TooltipTrigger>
            <TooltipContent className="mr-2 w-1/2">
              <p>{msg}</p>
            </TooltipContent>
          </Tooltip>
          <div></div>
        </Alert>
      )}
    </>
  );
}
