import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/ui/feedback/popover";
import { Button } from "@/lib/components/ui/inputs/button";
import { Copy } from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/data-display/card";

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

  return (
    <>
      {msg && (
        <Popover>
          <PopoverTrigger
            asChild
            className={
              "border border-gray-300 bg-white shadow-md rounded-lg  cursor-pointer hover:shadow-lg transition-shadow"
            }
          >
            <Card className="mr-2  ">
              <CardContent className={"p-4 "}>
                <p className="text-sm text-red-600 underline dark:text-red-500 font-medium line-clamp-2  break-words">
                  {msg}
                </p>
              </CardContent>
            </Card>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4">
            <p className="text-sm ">{msg}</p>
            <Button variant={"outline"} className={"mt-2"} onClick={handleCopy}>
              {" "}
              <Copy className="h-4 w-4 mr-2" /> Copy to Clipboard
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
