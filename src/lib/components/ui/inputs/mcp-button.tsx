import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/ui/feedback/popover";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        highlight:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-4 w-4 ",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface McpButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  mcpResponse?: string | string[];
  icon?: React.ReactNode;
}

const McpButton = React.forwardRef<HTMLButtonElement, McpButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon,
      mcpResponse,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Popover>
        <PopoverTrigger className={"text-xs"} asChild>
          <Comp
            className={cn(
              buttonVariants({ variant, size, className }),
              isLoading && "opacity-70  cursor-not-allowed",
            )}
            ref={ref}
            disabled={isLoading}
            {...props}
          >
            <>
              {isLoading ? (
                <Sparkles className="mr-2 h-4 w-4 mx-auto animate-spin text-yellow-500" />
              ) : (
                <>
                  {icon ?? (
                    <Sparkles className="mr-2 h-4 w-4 mx-auto text-yellow-500" />
                  )}
                </>
              )}
              {props.children}
            </>
          </Comp>
        </PopoverTrigger>
        {mcpResponse && !isLoading && Array.isArray(mcpResponse) && (
          <PopoverContent className="w-96 text-xs rounded-md p-4 flex flex-col space-y-2">
            {mcpResponse.map((text, index) => {
              const errorMatch = text.match(/(Error:)(.*)/); // Match "Error:" and the text after it
              return (
                <div key={index} className="flex flex-col space-y-1">
                  <h4 className="text-sm font-semibold">
                    <span className="relative pl-6">
                      <Sparkles className="absolute left-0 top-0 h-5 w-5 text-yellow-500" />
                      {text.split(".")[0] + "."}
                    </span>
                  </h4>
                  <span className="text-left">
                    {errorMatch ? (
                      <>
                        {text.split("Error:")[0]}
                        <span className="text-red-500 my-2 font-bold text-md">
                          Error:{errorMatch[2]}
                        </span>
                      </>
                    ) : (
                      text.split(".").slice(1).join(".").trim()
                    )}
                  </span>
                </div>
              );
            })}
          </PopoverContent>
        )}
        {mcpResponse && !isLoading && !Array.isArray(mcpResponse) && (
          <PopoverContent className="w-72 text-sm rounded-md p-4">
            <h4 className="text-lg font-semibold">
              <span className="relative pl-6">
                <Sparkles className="absolute left-0 top-0 h-5 w-5 text-yellow-500" />
                {mcpResponse}
              </span>
            </h4>
          </PopoverContent>
        )}
      </Popover>
    );
  },
);
McpButton.displayName = "McpButton";

export { McpButton, buttonVariants };
