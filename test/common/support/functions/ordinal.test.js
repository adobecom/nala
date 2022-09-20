import { ordinal } from '../../../../common/support/functions/ordinal';

test('cardinal to ordinal', () => {
  expect(ordinal(0)).toBe('1st');  
  expect(ordinal(1)).toBe('2nd');
  expect(ordinal(2)).toBe('3rd');
  expect(ordinal(3)).toBe('4th');
  expect(ordinal(4)).toBe('5th');
  expect(ordinal(5)).toBe('6th');
  expect(ordinal(6)).toBe('7th');
  expect(ordinal(7)).toBe('8th');
  expect(ordinal(8)).toBe('9th');
  expect(ordinal(9)).toBe('10th');
});