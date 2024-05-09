import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast, Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(`Something went wrong: ${error.message}`);
        }
      },

      refetchOnWindowFocus: "always",
    },
  });
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster richColors closeButton />
          <RouterProvider router={router} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
