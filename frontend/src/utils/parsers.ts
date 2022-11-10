export const numParser = (value: number | "Нет данных") => {
  if (value !== "Нет данных") {
    let newVal = value.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(newVal)) newVal = newVal.replace(pattern, "$1,$2");
    return newVal;
  } else {
    return "Нет данных";
  }
};

export const rubParser = (value: number | "Нет данных") => {
  return numParser(value) + `\u20bd`;
};
