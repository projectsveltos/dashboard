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
  popupText?: string;
}

const McpButton = React.forwardRef<HTMLButtonElement, McpButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      popupText,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Comp
            className={cn(
              buttonVariants({ variant, size, className }),
              isLoading && "opacity-70 cursor-not-allowed",
            )}
            ref={ref}
            disabled={isLoading}
            {...props}
          >
            {isLoading ? (
              <Sparkles className="mr-2 h-4 w-4 mx-auto animate-spin text-yellow-500" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 mx-auto text-yellow-500" />
            )}
            {props.children}
          </Comp>
        </PopoverTrigger>
        {popupText && (
          <PopoverContent className="w-72 text-l rounded-md p-4 flex flex-col space-y-2">
            <h4 className="text-lg font-semibold">
              <span className="relative pl-6">
                <Sparkles className="absolute left-0 top-0 h-5 w-5 text-yellow-500" />
                {popupText.split(".")[0] + "."}
              </span>
            </h4>
            <div className="flex space-x-2">
              <span className="text-left">
                {popupText.split(".").slice(1).join(".").trim()}
              </span>
            </div>
          </PopoverContent>
        )}
      </Popover>
    );
  },
);
McpButton.displayName = "McpButton";

export { McpButton, buttonVariants };
