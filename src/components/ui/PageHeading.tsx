import { CardsFilterToolbar } from "@/modules/clusters/clusters-list/components/CardsFilterToolbar";
interface PageHeadingProps {
  title: string;
  description: string;
}
export const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <>
      <div className="hidden space-y-8 p-8 flex-col md:flex">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground w-2/3">
              {description}
              <a
                href="https://projectsveltos.github.io/sveltos/"
                className="text-main-500 hover:text-main-800"
              >
                Docs & Troubleshooting
              </a>
              .
            </p>
          </div>
          <div className="justify-end">
            <CardsFilterToolbar />
          </div>
        </div>
      </div>
    </>
  );
};
