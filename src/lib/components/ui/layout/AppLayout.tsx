import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Logo } from "@/lib/components/assets/logo/logo";
import { appConfig } from "@/config/app";

export function Applayout() {
  return (
    <>
      <Header />
      <a
        href={appConfig.github.url}
        target="_blank"
        className="fixed right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg shadow-lg rotate-90 flex items-center space-x-2"
        rel="noreferrer"
      >
        <span>Powered by</span> <Logo />
      </a>
      <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
      <div className="container px-4 md:px-8">
        <Footer />
      </div>
    </>
  );
}
