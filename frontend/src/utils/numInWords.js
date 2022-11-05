const TRIPLET_NAMES = [
    null,
    ["тысяча", "тысячи", "тысяч"],
    ["миллион", "миллиона", "миллионов"],
    ["миллиард", "миллиарда", "миллиардов"],
    ["триллион", "триллиона", "триллионов"],
    ["квадриллион", "квадриллиона", "квадриллионов"],
  ],
  ZERO_NAME = "нуль",
  ONE_THOUSANT_NAME = "одна",
  TWO_THOUSANTS_NAME = "две",
  HUNDRED_NAMES = [
    null,
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ],
  TEN_NAMES = [
    null,
    null,
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ],
  UNIT_NAMES = [
    ZERO_NAME,
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ],
  TEN_UNIT_NAMES = [
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ],
  INPUT_VALUE_LIMIT = Number.MAX_SAFE_INTEGER;

function pluralEnding(number, variants) {
  var one = variants[0],
    two = variants[1],
    five = variants[2];
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return five;
  }
  number %= 10;
  if (number === 1) {
    return one;
  } else if (number >= 2 && number <= 4) {
    return two;
  }
  return five;
}

export default function numberInWords(number) {
  var numberInWords = [],
    tripletOfZerosMask = 0,
    i,
    pos,
    length,
    tripletNames,
    tripletIndex,
    digitPosition,
    prevDigitValue;

  if (typeof number !== `string`) {
    number = number + "";
  }

  if (number > INPUT_VALUE_LIMIT) {
    return undefined;
  }

  length = number.length;

  for (i = 0; i < length; i += 1) {
    pos = length - 1 - i;
    tripletIndex = Math.floor(pos / 3);
    digitPosition = pos % 3;
    const digitValue = parseInt(number[i]);

    if (digitPosition === 2) {
      tripletOfZerosMask = 0;
      if (digitValue === 0) {
        tripletOfZerosMask |= 0b100;
      } else if (digitValue) {
        numberInWords.push(HUNDRED_NAMES[digitValue]);
      }
      continue;
    }
    if (digitPosition === 1) {
      if (digitValue === 0) {
        tripletOfZerosMask |= 0b10;
      } else if (digitValue === 1) {
        numberInWords.push(TEN_UNIT_NAMES[parseInt(number[i + 1])]);
      } else if (digitValue) {
        numberInWords.push(TEN_NAMES[digitValue]);
      }
      continue;
    }
    if (digitPosition === 0) {
      prevDigitValue = i - 1 >= 0 ? parseInt(number[i - 1]) : null;
      if (digitValue === 0) {
        tripletOfZerosMask |= 0b1;
        if (length === 1) {
          numberInWords.push(ZERO_NAME);
        }
      } else if ((prevDigitValue && prevDigitValue !== 1) || !prevDigitValue) {
        if (tripletIndex === 1 && digitValue == 1) {
          numberInWords.push(ONE_THOUSANT_NAME);
        } else if (tripletIndex === 1 && digitValue == 2) {
          numberInWords.push(TWO_THOUSANTS_NAME);
        } else {
          numberInWords.push(UNIT_NAMES[digitValue]);
        }
      }

      tripletNames = TRIPLET_NAMES[tripletIndex];
      if (tripletNames && tripletOfZerosMask !== 0b111) {
        if (prevDigitValue === 1) {
          numberInWords.push(pluralEnding(10 + digitValue, tripletNames));
        } else {
          numberInWords.push(pluralEnding(digitValue, tripletNames));
        }
      }
      continue;
    }
  }

  numberInWords[0] =
    numberInWords[0].charAt(0).toUpperCase() + numberInWords[0].substring(1);

  return (
    numberInWords
      // .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ")
  );
}
