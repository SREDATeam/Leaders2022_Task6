export function segInetify(val) {
  switch (val) {
    case 0:
      return "Новостройка";
    case 1:
      return "Современное жилье";
    case 2:
      return "Старый жилой фонд";
    default:
      return "Нет данных";
  }
}

export function wallInetify(val) {
  switch (val) {
    case 1:
      return "Кирпич";
    case 2:
      return "Панель";
    case 3:
      return "Монолит";
    default:
      return "Нет данных";
  }
}

export function remInetify(val) {
  switch (val) {
    case 1:
      return "Без отделки";
    case 2:
      return "Муниципальный ремонт";
    case 3:
      return "Современная отделка";
    default:
      return "Нет данных";
  }
}
export function balcInetify(val) {
  switch (val) {
    case 1:
      return "Есть";
    case 0:
      return "Нет";
    default:
      return "Нет данных";
  }
}

export function roomsInetify(val) {
  switch (val) {
    case 0:
      return "Cтудия";
    case 1:
      return "1-комнатная";
    case 2:
      return "2-комнатная";
    case 3:
      return "3-комнатная";
    case 4:
      return "Многокомнатная";
    default:
      return "Нет данных";
  }
}
