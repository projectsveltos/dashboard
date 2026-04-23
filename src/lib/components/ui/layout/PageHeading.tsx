import { CardsFilterToolbar } from "@/modules/clusters/clusters-list/components/CardsFilterToolbar";
interface PageHeadingProps {
  title: string;
  description: string;
}
export const PageHeading = ({ title, description }: PageHeadingProps) => {
  return (
    <>
      <div className="hidden space-y-1 py-4 flex-col md:flex">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm w-full md:w-2/3">
              {description}
              <a
                href="https://projectsveltos.github.io/sveltos/"
                className="text-primary hover:text-primary/80 ml-1"
              >
                Docs
              </a>
              .
            </p>
          </div>
          <div className="justify-end scale-90 origin-right">
            <CardsFilterToolbar />
          </div>
        </div>
      </div>
    </>
  );
};
