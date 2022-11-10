export const roundTo = (value: number, precision: number) => {
  const power = Math.pow(10, -precision);
  return Math.floor(value * power) / power;
};

export const secureRound = (number: number | undefined, precision: number) => {
  if (number === undefined) {
    return "Нет данных";
  } else {
    return roundTo(number, precision);
  }
};
