import { appConfig } from "@/config/app";

export const LoadingCards = () => {
  const skeletonCards = new Array(appConfig.defaultSize).fill(null);
  return (
    <div className={"flex flex-wrap mb-4 py-4"}>
      {skeletonCards.map((_, index) => (
        <div key={index} className="w-full md:w-1/2 p-2">
          <div className="bg-card dark:bg-gray-700 rounded-lg p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
