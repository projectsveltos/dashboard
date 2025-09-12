import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/lib/components/ui/layout/sheet";
import { Icons } from "@/lib/components/icons";
import { appConfig } from "@/config/app";
import { Button, buttonVariants } from "@/lib/components/ui/inputs/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/lib/components/ui/inputs/dropdown-menu";
import { mainMenu } from "@/config/menu";
import { DividerVerticalIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Logo } from "../../assets/logo/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/navigation/accordion";
import { ModeToggle } from "@/lib/components/ui/inputs/mode-toggle";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { LogOutIcon } from "lucide-react";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { VerifyInstallation } from "@/modules/common/components/actions/VerifyInstallation";

export function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const version = import.meta.env.VITE_APP_VERSION;
  const isPublicPreview = (version?.split(".")[0] ?? "") === "0" || true;

  const { logout } = useAuth();
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <div className="container px-4 md:px-8 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <NavLink to="/sveltos" className="mr-6 flex items-center space-x-2">
            <Logo />
            {version && (
              <Badge
                variant="secondary"
                className="text-xs text-muted-foreground"
              >
                {isPublicPreview ? "Public preview" : version}
              </Badge>
            )}
          </NavLink>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainMenu.map((menu, index) =>
              menu.items !== undefined ? (
                <DropdownMenu key={index}>
                  <DropdownMenuContent
                    className="w-48"
                    align="start"
                    forceMount
                  >
                    {menu.items.map((subitem, subindex) =>
                      subitem.to !== undefined ? (
                        <NavLink key={subindex} to={subitem.to}>
                          <DropdownMenuItem
                            className={cn("hover:cursor-pointer", {
                              "bg-muted": subitem.to === location.pathname,
                            })}
                          >
                            {subitem.title}
                          </DropdownMenuItem>
                        </NavLink>
                      ) : subitem.label ? (
                        <DropdownMenuLabel key={subindex}>
                          {subitem.title}
                        </DropdownMenuLabel>
                      ) : (
                        <DropdownMenuSeparator key={subindex} />
                      ),
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : menu.disabled ? (
                <Button key={index} variant="link" disabled>
                  {menu.icon && menu.icon}
                  <span className="ml-1">{menu.title} </span>
                </Button>
              ) : (
                <NavLink
                  key={index}
                  to={menu.to ?? ""}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium flex items-center transition-colors hover:text-primary",
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 p-2 rounded hover:text-main-500 "
                        : "text-foreground/60 hover:text-primary",
                    )
                  }
                >
                  {menu.icon && menu.icon}
                  <span className="ml-1">{menu.title}</span>
                </NavLink>
              ),
            )}
          </nav>
        </div>
        {/* mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <HamburgerMenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2"
            >
              <Logo />
            </NavLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={
                  "item-" +
                  mainMenu.findIndex((item) =>
                    item.items !== undefined
                      ? item.items
                          .filter((subitem) => subitem.to !== undefined)
                          .map((subitem) => subitem.to)
                          .includes(location.pathname)
                      : false,
                  )
                }
              >
                <div className="flex flex-col space-y-3">
                  {mainMenu.map((menu, index) =>
                    menu.items !== undefined ? (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b-0 pr-6"
                      >
                        <AccordionTrigger
                          className={cn(
                            "py-1 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary",
                            menu.items
                              .filter((subitem) => subitem.to !== undefined)
                              .map((subitem) => subitem.to)
                              .includes(location.pathname)
                              ? "text-foreground"
                              : "text-foreground/60",
                          )}
                        >
                          <div className="flex">{menu.title}</div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4">
                          <div className="mt-1">
                            {menu.items.map((submenu, subindex) =>
                              submenu.to !== undefined ? (
                                <NavLink
                                  key={subindex}
                                  to={submenu.to}
                                  onClick={() => setOpen(false)}
                                  className={({ isActive }) =>
                                    cn(
                                      "block justify-start py-1 h-auto font-normal hover:text-primary",
                                      isActive
                                        ? "text-foreground"
                                        : "text-foreground/60",
                                    )
                                  }
                                >
                                  {submenu.title}
                                </NavLink>
                              ) : submenu.label !== "" ? null : (
                                <div className="px-3">
                                  {/* <Separator /> */}
                                </div>
                              ),
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <NavLink
                        key={index}
                        to={menu.to ?? ""}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "py-1 text-sm font-medium transition-colors hover:text-primary",
                            isActive ? "text-foreground" : "text-foreground/60",
                          )
                        }
                      >
                        {menu.title}
                      </NavLink>
                    ),
                  )}
                </div>
              </Accordion>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <a href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Logo />
        </a>
        {/* right */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <div className="hidden md:block">
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
                  "w-9 px-0",
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <VerifyInstallation />
            <DividerVerticalIcon />

            <Button variant={"outline"} onClick={logout} size={"sm"}>
              <LogOutIcon className={"h-4 w-4 mx-1"} />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
