import { appConfig } from "@/config/app";

export const LoadingAddons = () => {
  const skeletonCards = new Array(appConfig.defaultTableSize).fill(null);
  return (
    <>
      <div className="grid auto-rows-max animate-pulse items-start gap-4 lg:col-span-2 lg:gap-8">
        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
        <div className="h-32 bg-slate-200 dark:bg-slate-600 rounded w-2/4"></div>
        <div className="flex items-center">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="h-4 mx-4 bg-slate-200 dark:bg-slate-600 rounded w-16"
            ></div>
          ))}
          <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-40"></div>
        </div>
        {skeletonCards.map((_, index) => (
          <div key={index}>
            <div className="bg-card dark:bg-gray-700 rounded-lg p-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-slate-200   dark:bg-slate-600 rounded w-32"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
