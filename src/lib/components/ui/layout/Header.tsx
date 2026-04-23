import useAuth from "@/modules/authentication/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { LogOutIcon, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { ModeToggle } from "@/lib/components/ui/inputs/mode-toggle";
import { LanguageSwitcher } from "@/lib/components/ui/inputs/language-switcher";
import { VerifyInstallation } from "@/modules/common/components/actions/VerifyInstallation";
import { Icons } from "@/lib/components/icons";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/lib/components/ui/inputs/button";
import { DividerVerticalIcon } from "@radix-ui/react-icons";

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

export function Header({ isOpen, toggleSidebar }: HeaderProps) {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border shrink-0 bg-header/80 backdrop-blur-md">
      <div className="px-4 md:px-8 flex h-14 items-center justify-between">
        <div className="flex-1 flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-accent transition-colors"
            title={t("common.toggle_menu") || "Toggle Sidebar"}
          >
            {isOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2 md:justify-end">
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>

          <nav className="flex items-center space-x-2">
            <a
              href={appConfig.github.url}
              title={appConfig.github.title}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <div className="text-muted-foreground">
              <VerifyInstallation />
            </div>
            <DividerVerticalIcon className="text-border" />

            <Button
              variant="outline"
              onClick={logout}
              size="sm"
              className="text-xs"
            >
              <LogOutIcon className="h-3.5 w-3.5 mr-1.5" />
              {t("common.logout")}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
