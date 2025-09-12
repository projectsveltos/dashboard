import { appConfig } from "@/config/app";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row">
      <div className="container mx-auto text-sm text-center">
        <p>
          Built by
          <a href={appConfig.github.url} className={"underline"}>
            {" "}
            {appConfig.name} Community
          </a>
        </p>
      </div>
    </footer>
  );
}
