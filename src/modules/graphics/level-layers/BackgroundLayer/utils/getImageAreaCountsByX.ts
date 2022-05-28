export const getImageAreaCountsByX = (areaWidth: number, imageWidth: number): number[] => {
  const columns = Math.floor(areaWidth / imageWidth) + 1;

  let x = 0;
  return Array(columns)
    .fill(null)
    .reduce((acc) => {
      acc.push(x);
      x += imageWidth;

      return acc;
    }, []);
};
