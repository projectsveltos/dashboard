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

// Renders a single "ProfileName: cause text" line.
// Splits on the first ": " so the profile name becomes a compact label
// and the cause is shown as normal readable text below it.
function ResponseLine({ text, index }: { text: string; index: number }) {
  const colonAt = text.indexOf(": ");
  const label = colonAt !== -1 ? text.slice(0, colonAt) : text;
  const body = colonAt !== -1 ? text.slice(colonAt + 2).trim() : "";
  const errorMatch = body.match(/Error:(.*)/s);

  return (
    <div key={index} className="flex flex-col space-y-1">
      <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
        {label}
      </span>
      {body && (
        <p className="text-xs text-muted-foreground pl-5 leading-relaxed">
          {errorMatch ? (
            <>
              {body.split("Error:")[0]}
              <span className="text-red-500 font-medium">
                Error:{errorMatch[1]}
              </span>
            </>
          ) : (
            body
          )}
        </p>
      )}
    </div>
  );
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

    const lines = mcpResponse
      ? Array.isArray(mcpResponse)
        ? mcpResponse
        : mcpResponse.split("\n").filter(Boolean)
      : [];

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
        {lines.length > 0 && !isLoading && (
          <PopoverContent className="w-96 rounded-md p-4 flex flex-col space-y-3">
            {lines.map((text, index) => (
              <ResponseLine key={index} text={text} index={index} />
            ))}
          </PopoverContent>
        )}
      </Popover>
    );
  },
);
McpButton.displayName = "McpButton";

export { McpButton, buttonVariants };
