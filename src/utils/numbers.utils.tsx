export function shortNumberTransform(value: number): any {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return null;
  } // value is a number
  let abs = Math.abs(number);
  const rounder = 10 ** 1;
  const isNegative = number < 0; // Negetive numbers
  let key = '';

  const powers = [
    { key: 'Q', value: 10 ** 15 },
    { key: 'T', value: 10 ** 12 },
    { key: 'B', value: 10 ** 9 },
    { key: 'M', value: 10 ** 6 },
    { key: 'K', value: 1000 },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const row of powers) {
    let reduced = abs / row.value;
    reduced = Math.round(reduced * rounder) / rounder;
    if (reduced >= 1) {
      abs = reduced;
      key = row.key;
      break;
    }
  }
  return (isNegative
    ? '-'
    : '') + abs + key;
}

export const percentageNormalizer = (value, prevValue) => {
  if (value === '' || value === '-' || (!Number.isNaN(value) && /^\d{0,3}?$/.test(value) && value >= 0 && value <= 100)) {
    return value;
  }
  return prevValue;
};
