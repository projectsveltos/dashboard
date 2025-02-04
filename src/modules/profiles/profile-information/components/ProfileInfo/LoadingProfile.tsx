export const LoadingProfile = () => {
  return (
    <>
      <div className="grid mt-4 auto-rows-max animate-pulse items-start gap-4 lg:col-span-2 lg:gap-8">
        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-2/4"></div>

        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6">
            <div
              className={"h-screen bg-slate-200 dark:bg-slate-600 rounded "}
            ></div>
          </div>
          <div className="col-span-5">
            <div
              className={"h-1/2 bg-slate-200 dark:bg-slate-600 rounded "}
            ></div>
            <div
              className={"h-1/2 mt-2 bg-slate-200 dark:bg-slate-600 rounded "}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
