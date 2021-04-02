export const randomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const randomIntegerCount = (
  min: number,
  max: number,
  count: number,
): number[] => {
  const array = [];
  for (let i = min; i < max; i++) {
    array.push(i);
  }
  return shuffleArrayCount(array, count);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const shuffleArrayCount = <T>(array: T[], count: number): T[] => {
  return shuffleArray(array).slice(0, count);
};
