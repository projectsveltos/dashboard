import { NavLink } from "react-router-dom";
import { appConfig } from "@/config/app";
import { Logo } from "@/lib/components/assets/logo/logo";
import { mainMenu } from "@/config/menu";
import { useTranslation } from "react-i18next";
import { Badge } from "@/lib/components/ui/data-display/badge";
import React from "react";
import { cn } from "@/lib/utils";
import { Book, LifeBuoy, ExternalLink } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "border-r border-border flex flex-col justify-between transition-all duration-300 overflow-hidden shrink-0 bg-sidebar",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div>
        <div
          className={cn(
            "p-4 pb-2 flex flex-col mb-2",
            !isOpen && "items-center px-2",
          )}
        >
          <div className="flex items-center space-x-3 mb-2 justify-center">
            <NavLink to="/sveltos" className="flex items-center shrink-0">
              <Logo className="w-8 h-8" showText={isOpen} />
              {isOpen && appConfig.version && (
                <Badge
                  variant="secondary"
                  className="ml-3 text-[10px] py-0 px-1.5 h-4 bg-primary/10 text-primary border-primary/20"
                >
                  {appConfig.version ?? "preview"}
                </Badge>
              )}
            </NavLink>
          </div>
          {isOpen && (
            <div className="h-px bg-gradient-to-r from-border via-muted to-transparent w-full mt-2"></div>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          {mainMenu.map((menu, index) => (
            <React.Fragment key={index}>
              {menu.items !== undefined ? (
                <div
                  className={cn(
                    "px-6 py-2 text-muted-foreground text-[10px] font-bold uppercase tracking-wider",
                    !isOpen && "hidden",
                  )}
                >
                  {menu.title}
                </div>
              ) : menu.disabled ? (
                <div
                  className={cn(
                    "flex items-center px-6 py-2.5 text-sm font-semibold text-muted-foreground/60 cursor-not-allowed",
                    !isOpen && "justify-center px-0",
                  )}
                >
                  {menu.icon && (
                    <span
                      className={cn(
                        "[&>svg]:w-5 [&>svg]:h-5",
                        isOpen && "mr-3",
                      )}
                    >
                      {menu.icon}
                    </span>
                  )}
                  {isOpen && menu.title}
                </div>
              ) : (
                <NavLink
                  to={menu.to ?? ""}
                  title={
                    !isOpen
                      ? t(`common.${menu.title.toLowerCase()}`)
                      : undefined
                  }
                  className={({ isActive }) =>
                    cn(
                      "flex items-center text-sm font-semibold transition-all duration-200 border-l-4 mx-2 rounded-r-md",
                      isOpen
                        ? "px-4 py-2.5"
                        : "px-0 py-2.5 justify-center",
                      isActive
                        ? "text-primary bg-primary/10 border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-accent/40",
                    )
                  }
                >
                  {menu.icon && (
                    <span
                      className={cn(
                        "[&>svg]:w-5 [&>svg]:h-5",
                        isOpen && "mr-3",
                      )}
                    >
                      {menu.icon}
                    </span>
                  )}
                  {isOpen && (
                    <div className="flex items-center justify-between flex-1">
                      <span className="whitespace-nowrap">
                        {t(`common.${menu.title.toLowerCase()}`)}
                      </span>
                      {menu.enterprise && (
                        <Badge
                          variant="outline"
                          className="text-[8px] font-bold px-1.5 py-0 h-4 border-primary/40 bg-primary/5 text-primary ml-auto"
                        >
                          ENT
                        </Badge>
                      )}
                    </div>
                  )}
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className={cn("p-4 mb-2 mt-auto", !isOpen && "px-2 pb-4")}>
        {/* Separator before Support/Docs */}
        <div className="h-px bg-border w-full mb-6 opacity-50"></div>

        <div
          className={cn(
            "flex flex-col gap-4 text-xs font-semibold text-muted-foreground",
            !isOpen && "items-center",
          )}
        >
          <a
            href={appConfig.docs}
            target="_blank"
            rel="noreferrer"
            title="DOCS"
            className="flex items-center hover:text-gray-300 justify-between group"
          >
            <div className="flex items-center">
              <Book className={cn("w-4 h-4", isOpen && "mr-2")} />
              {isOpen && "DOCS"}
            </div>
            {isOpen && (
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            )}
          </a>
          <a
            href="https://github.com/projectsveltos/sveltos/issues/new"
            target="_blank"
            rel="noreferrer"
            title="SUPPORT"
            className="flex items-center hover:text-gray-300 justify-between group"
          >
            <div className="flex items-center">
              <LifeBuoy className={cn("w-4 h-4", isOpen && "mr-2")} />
              {isOpen && "SUPPORT"}
            </div>
            {isOpen && (
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
