// pickSearchParams returns the parameters of searchParams named in config which are set.
export const pickSearchParams = (
  config: { key: string }[],
  searchParams: URLSearchParams,
): Record<string, string> => {
  const params: Record<string, string> = {};
  config.forEach(({ key }) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  return params;
};

// omitSearchParams returns a copy of searchParams without the parameters named in config.
export const omitSearchParams = (
  config: { key: string }[],
  searchParams: URLSearchParams,
): URLSearchParams => {
  const next = new URLSearchParams(searchParams);
  config.forEach(({ key }) => next.delete(key));
  return next;
};
