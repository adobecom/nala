/**
 * Ordinal to cardinal
 * @param {string} ordinal ordinal number
 */
export function cardinal(ordinal) {
  return {
    '': 0,
    first: 0,
    '1st': 0,
    second: 1,
    '2nd': 1,
    third: 2,
    '3rd': 2,
    fourth: 3,
    '4th': 3,
    fifth: 4,
    '5th': 4,
    sixth: 5,
    '6th': 5,
    seventh: 6,
    '7th': 6
  }[ordinal];
}
