/**
 * Cardinal to ordinal
 * @param {number} cardinal cardinal number
 */
export function ordinal(cardinal) {
  return {
    0: '1st',
    1: '2nd',
    2: '3rd',
    3: '4th',
    4: '5th',
    5: '6th',
    6: '7th',
    7: '8th',
    8: '9th',
    9: '10th'    
  }[cardinal];
};

export default ordinal;
