export const getItemsToSkip = (page: number, size: number) => {
  return (page - 1) * size;
};
