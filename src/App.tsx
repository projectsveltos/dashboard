import { ThemeProvider } from "./contexts/ThemeContext";
import { TooltipProvider } from "@/lib/components/ui/tooltip";
import { toast, Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/routes";

export default function App() {
  const queryClient = new QueryClient();
  const { authenticate } = useAuth();
  queryClient.setDefaultOptions({
    queries: {
      retry: 2,
      staleTime: 30 * 1000,
      onError: (error: unknown) => {
        if (error instanceof Error) {
          if (
            isAxiosError(error) &&
            error.response &&
            error.response.status === 401
          ) {
            window.location.href = "/login?error=unauthorized";
            toast.error("Unauthorized, please login again");
          }
          toast.error(`Something went wrong: ${error.message}`);
        }
      },

      refetchOnWindowFocus: "always",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("auth");
    if (token) {
      authenticate(token);
    }
  }, [authenticate]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster richColors closeButton />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children?.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
