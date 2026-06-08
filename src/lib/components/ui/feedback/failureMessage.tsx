import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/ui/feedback/popover";
import { Button } from "@/lib/components/ui/inputs/button";
import { AlertCircle, Copy } from "lucide-react";

export function FailureMessage({ msg }: { msg?: string | undefined | null }) {
  function handleCopy() {
    if (!msg) return;

    try {
      navigator.clipboard.writeText(msg);
      toast.message("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast.error("Failed to copy to clipboard");
    }
  }

  if (!msg) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 gap-1.5 whitespace-nowrap"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          View Error
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4 space-y-3">
        <p className="text-sm leading-relaxed break-words">{msg}</p>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy to Clipboard
        </Button>
      </PopoverContent>
    </Popover>
  );
}
