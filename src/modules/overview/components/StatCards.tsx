export function StatCards() {
  const cards = [
    {
      title: "TOTAL CLUSTERS",
      value: "42",
      sub: "-2",
      subColor: "text-red-400",
    },
    {
      title: "HEALTHY",
      value: "38",
      sub: "/42",
      subColor: "text-muted-foreground",
    },
    { title: "PROFILES APPLIED", value: "15" },
    { title: "ADDONS DEPLOYED", value: "120" },
    {
      title: "DRIFT DETECTED",
      value: "3",
      sub: "WARNING",
      subColor:
        "text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded text-[10px] ml-2",
      titleColor: "text-orange-400",
    },
    { title: "EVENTS (24H)", value: "450" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-card rounded-xl p-4 border border-border flex flex-col pt-4"
        >
          <h3
            className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${card.titleColor || "text-muted-foreground"}`}
          >
            {card.title}
          </h3>
          <div className="flex items-baseline mt-auto">
            <span className="text-3xl font-extrabold text-foreground">
              {card.value}
            </span>
            {card.sub && (
              <span
                className={`ml-1 font-semibold text-[10px] ${card.subColor}`}
              >
                {card.sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
