import { appConfig } from "@/config/app";

export function LoadingTier() {
  const skeletonCards = new Array(appConfig.defaultSize / 2).fill(null);
  return (
    <div
      className={" p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4"}
    >
      {skeletonCards.map((_, index) => (
        <div key={index} className="w-full h-1/2  p-2">
          <div className="bg-card dark:bg-gray-700 rounded-lg p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="space-y-2">
                  {new Array(appConfig.defaultSize)
                    .fill(null)
                    .map((_, index) => (
                      <div key={index}>
                        <div className="h-[40px] bg-slate-200 dark:bg-slate-600 rounded"></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
